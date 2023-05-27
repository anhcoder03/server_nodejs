const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  removeProduct,
} = require("../controllers/productController");
const {
  createCategory,
  removeCategory,
  updateCategory,
  getAllCategory,
  getCategoryById,
} = require("../controllers/categoryController");
const {
  register,
  login,
  getAllUser,
  getUserById,
  updateUser,
  removeUser,
} = require("../controllers/authController");
const { verifyTokenAdmin } = require("../middleware/auth");

const route = express.Router();

const initApiRoute = (app) => {
  //category
  route.post("/create-category", createCategory);
  route.delete("/remove-category/:id", removeCategory);
  route.put("/update-category/:id", updateCategory);
  route.get("/get-all-category", getAllCategory);
  route.get("/get-category/:id", getCategoryById);

  //product
  route.post("/create-product", createProduct);
  route.put("/update-product/:id", updateProduct);
  route.delete("/remove-product/:id", removeProduct);
  route.get("/getProducts", getProducts);
  route.get("/getProduct/:id", getProductById);
  return app.use("/api/v1", route);
};
const authRoute = (app) => {
  route.post("/register", register);
  route.post("/login", login);
  route.get("/get-all-user", verifyTokenAdmin, getAllUser);
  route.get("/getUser/:id", getUserById);
  route.put("/update-user/:id", updateUser);
  route.delete("/remove-user/:id", removeUser);
  return app.use("/api/v1", route);
};

module.exports = { initApiRoute, authRoute };
