const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");
const { createCategory } = require("../controllers/categoryController");

const route = express.Router();

const initApiRoute = (app) => {
  //category
  route.post("/create-category", createCategory);

  //product
  route.post("/create-product", createProduct);
  route.get("/getProducts", getProducts);
  route.get("/getproduct/:id", getProductById);
  return app.use("/api/v1", route);
};

module.exports = { initApiRoute };
