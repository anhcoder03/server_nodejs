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
  createNewRefreshToken,
  logout,
} = require("../controllers/authController");
const { verifyTokenAdmin, verifyToken } = require("../middleware/auth");

const { uploadImage, deleteImage } = require("../controllers/uploadController");
const { storage } = require("../config/cloudinary");
const multer = require("multer");

const upload = multer({ storage: storage });
const route = express.Router();

const initApiRoute = (app) => {
  //image
  route.post("/upload-image", upload.array("image", 10), uploadImage);
  route.delete("/delete-image/:publicId", deleteImage);

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
  route.post("/refreshToken", createNewRefreshToken);
  route.post("/logout", verifyToken, logout);
  return app.use("/api/v1", route);
};

module.exports = { initApiRoute, authRoute };
