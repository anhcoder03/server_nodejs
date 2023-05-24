const express = require("express");
const { getProductAll } = require("../controllers/productController");

const route = express.Router();

const initApiRoute = (app) => {
  route.get("/getproduct", getProductAll);
  return app.use("/api/v1", route);
};

module.exports = { initApiRoute };
