import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel";
import { handleError, notify, validateDocument } from "../utils.js";

const signup = async (req, res) => {
  const {
    username,
    email,
    password,
    phoneNumber,
    address,
    location,
  } = req.body;

  if (!username || !email || !password || !phoneNumber) {
    return userModel(req.body).save(function (error) {
      handleError(error, res);
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userDetails = {
    username: username.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    phoneNumber: phoneNumber.trim(),
    address,
    location,
  };

  const user = new userModel(userDetails);
  user.save(function (err, document) {
    if (err) {
      return handleError(err, res);
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: "7d",
    });

    const newUser = document.toObject();
    delete newUser.__v;
    delete newUser.password;

    return res.status(201).json({
      message: "status: success - user profile created",
      newUser,
      token,
    });
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ message: "status: failed - Please provide email and password" });
  }
  const existingUser = await userModel.findOne({
    email: email.toLowerCase(),
  });

  if (!existingUser) {
    return res.status(404).send({
      message: "status: failed - Email or password is incorrect",
    });
  }

  await bcrypt.compare(password, existingUser.password, (error, isMatch) => {
    if (error) {
      return res.status(400).send({
        message: "status: failed - Email or password is incorrect",
      });
    } else if (isMatch) {
      const token = jwt.sign(
        { userId: existingUser.id },
        process.env.APP_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        messge: "status: success - signed in",
        token,
        user: {
          _id: existingUser._id,
          username: existingUser.username,
        },
      });
    } else {
      return res.status(400).send({
        message: "status: failed - Email or password is incorrect",
      });
    }
  });
};

const notifyUser = async (req, res) => {
  const { recipientId, senderId, message } = req.body;

  const returnFields = "-createdAt -updatedAt -__v";
  const fieldsToPopulate = "";

  const receiver = await validateDocument("user", recipientId, {
    returnFields,
    fieldsToPopulate,
  });

  if (receiver.error) {
    const {
      error: { code, message },
    } = receiver;

    return res.status(code).send({
      message,
    });
  }

  const sender = await validateDocument("user", senderId, {
    returnFields,
    fieldsToPopulate,
  });

  if (sender.error) {
    const {
      error: { code, message },
    } = sender;

    return res.status(code).send({
      message,
    });
  }

  let messageHtmlTemplate = `<body>
    <div style="outline: #F3F3F7 3px solid; padding: 10px; max-width: 630px; margin: 0 auto;">
      <div style="background-color:#F3F3F7; padding:10px; color:#BFBFC1; font-size: 12px; text-align: center; margin-bottom: 25px;">Trader Markets Sample App</div>
      <div>
        <div style="margin: 0 auto; max-width: 315px; font-size: 10px; color: #8893A3; flex-direction: column;">
          <p style="color: #000"><b>Hello ${receiver.username},</b></p>
          <p>You just received a message about one of your products. Open the web app to check it out or click the button below to open it directly.</p>
          <div>
          <a href="$trade-depot/reset?resetToken=#" style="margin: 25px auto; background: #EE5A33; color: #fff; width: 130px; height: 48px; border-radius: 3px; font-size: 10px;  text-decoration: none; padding: 5px 10px;">
              Check it out
          </a>
          </div>
          <span>${sender.username} - [via the web app]</span>
          <p>message: "${message}"</p>
        </div>
      </div>
      
      <div style="background-color:#F3F3F7; padding:10px; color:#BFBFC1; font-size: 10px; text-align: center; margin-top: 25px;">
        <p>${new Date().getFullYear()} trader_market_app Corporation. All rights reserved.</p>
        trader_market_app Corporation<br />
        235 Victoria Garden City, <br />
        Lagos, NG.
      </div>
    </div>
  </body>`;

  let payload = {
    receiver,
    message,
    email: {
      messageHtmlTemplate,
      subject: "Web app notification",
    },
  };

  notify(payload);

  return res.status(200).json({
    message: "status: success - check your email for a message",
  });
};

export default {
  signup,
  signin,
  notifyUser,
};
