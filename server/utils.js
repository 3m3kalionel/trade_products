import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Jusibe from "jusibe";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import userModel from "./models/userModel";
import productModel from "./models/productModel";

dotenv.config({ path: ".env" });

const jusibe = new Jusibe(
  process.env.JUSIBE_PUBLIC_KEY,
  process.env.JUSIBE_ACCESS_TOKEN
);

export const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const isEmpty = fieldValue => {
  return !(fieldValue.trim().length === 0);
};

export const handleError = ({ errors }, res) => {
  const modelErrors = Object.keys(errors);

  const message = errors[modelErrors.shift()].message;
  return res.status(400).send({
    message,
  });
};

const mailTransporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (user, email) => {
  const { subject, messageHtmlTemplate } = email;
  await mailTransporter.sendMail({
    from: "Your friends at trade_depot <random.projects.mailer@gmail.com>",
    to: user.email,
    subject,
    html: messageHtmlTemplate,
  });
};

export const sendText = (user, message) => {
  var payload = {
    to: user.phoneNumber,
    from: "<<- Trade Depot Sample ->>",
    message:
      `Hello, ${user.username}, Here's a new notification from Trade Depot web app \n` +
      `message: ${message}`,
  };

  jusibe
    .sendSMS(payload)
    .then(res => {
      console.log(res.body);
    })
    .catch(err => {
      console.log(err.body);
    });
};

export const notify = payload => {
  const { message, email, receiver } = payload;

  sendMail(receiver, email);
  sendText(receiver, message);
};

export const isValidMongoId = id => {
  const ObjectId = mongoose.Types.ObjectId;

  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const getModel = modelParam => {
  switch (modelParam) {
    case "user":
      return userModel;
      break;
    case "product":
      return productModel;
      break;
  }
};

export async function validateDocument(modelParam, documentId, queryOptions) {
  const error = new Error();
  const { returnFields, fieldsToPopulate } = queryOptions;

  let document;
  const model = getModel(modelParam);

  try {
    if (!isValidMongoId(documentId)) {
      error.code = 400;
      error.message = `status: failed - id ${documentId} is not a valid mongoose document id`;
      throw error;
    }

    document = returnFields
      ? await model.findById(documentId, returnFields).populate({
          path: fieldsToPopulate,
          select: returnFields,
        })
      : await model.findById(documentId, returnFields);
    if (!document) {
      error.code = 404;
      error.message = `status: failed - ${modelParam} id ${documentId} not found`;
      throw error;
    }

    return document;
  } catch (error) {
    if (error.message.includes("is not a valid mongoose document id")) {
      error.code = 400;
      return { error };
    }

    return { error };
  }
}

export const getDistanceDetailis = (distanceUnit, maximumDistance) => {
  switch (distanceUnit) {
    case "km":
      return {
        maxDistance: maximumDistance * 1000,
        distanceMultiplier: 1 / 1000,
        distanceField: "distance in km",
      };
      break;
    case "miles":
      return {
        maxDistance: maximumDistance * 1609.34,
        distanceMultiplier: 1 / 1609.34,
        distanceField: "distance in miles",
      };
      break;
  }
};

export const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.APP_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { userId } = payload;

    const user = await userModel.findById(userId);
    req.user = user;
    next();
  });
};
