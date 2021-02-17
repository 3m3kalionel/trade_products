import productModel from "../models/productModel";
import { handleError, validateDocument } from "../utils.js";

const createProduct = async (req, res) => {
  try {
    const { name, productOwnerId } = req.body;

    if (!name || !productOwnerId) {
      return productModel(req.body).save(function (error) {
        handleError(error, res);
      });
    }

    const returnFields = "-createdAt -updatedAt -__v";
    const fieldsToPopulate = "productOwnerId";
    const user = await validateDocument("user", productOwnerId, {
      returnFields,
      fieldsToPopulate,
    });

    if (user.error) {
      const {
        error: { code, message },
      } = user;

      return res.status(code).send({
        message,
      });
    }

    const newProduct = new productModel(req.body);
    newProduct.save(function (error, document) {
      error && error.errors
        ? handleError(error, res)
        : res.status(201).send({
            message: "status: success - product created and saved",
            product: document,
          });
    });
  } catch (err) {
    return res.status(400).send({
      message: "status: failed - something went wrong",
    });
  }
};

export default {
  createProduct,
};
