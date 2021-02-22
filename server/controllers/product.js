import productModel from "../models/productModel";
import {
  handleError,
  validateDocument,
  getDistanceDetailis,
} from "../utils.js";

const createProduct = async (req, res) => {
  try {
    const { name, productOwnerId, price } = req.body;

    if (!name || !productOwnerId || !price) {
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

const fetchProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate({ path: "productOwnerId", select: "username" })
      .sort({ createdAt: "desc" });
    return res.status(200).send({
      message: "status: success - products found",
      products,
    });
  } catch (error) {
    return res.status(400).send({
      message: "status: failed - something went wrong",
    });
  }
};

const fetchProductsByLocation = async (req, res) => {
  try {
    const { lng, lat, maximumDistance, distanceUnit, userId } = req.query;

    const distanceDetails = getDistanceDetailis(
      distanceUnit,
      parseFloat(maximumDistance)
    );

    const products = await productModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          spherical: true,
          query: { type: "public" },
          includeLocs: "dist.location",

          query: { _id: { $ne: userId } },
          ...distanceDetails,
        },
      },
    ]);

    res.status(200).send({
      message: "status: success - products found",
      products,
    });
  } catch (error) {
    return res.status(400).send({
      message: "status: failed - something went wrong",
    });
  }
};

export default {
  createProduct,
  fetchProducts,
  fetchProductsByLocation,
};
