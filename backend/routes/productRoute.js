const express = require("express");
const {
  fetchAllProducts,
  fetchSelectedProduct,
  deleteProduct,
  CreateProduct,
  UpdateProduct,
  changeStock,
  createReview,
  fetchTopRatedProducts,
} = require("../controllers/productController");
const checkAdmin = require("../middleware/checkAdmin");
const checkAuthorization = require("../middleware/checkAuthorization");
const router = express();

// to fetch all products
// /api/product/
// public route
router.get("/", fetchAllProducts);

// to fetch top rated products
// /api/product/
// public route
router.get("/toprated", fetchTopRatedProducts);

//to fetch single product
// /api/product/:id
// public route
router.get("/:id", fetchSelectedProduct);

router.put("/changeStock/:id", checkAuthorization, changeStock);

// to delete product
// /api/product/:id
// protected route
router.delete("/:id", checkAuthorization, checkAdmin, deleteProduct);

//to create product
// /api/product/
// protected route
router.post("/", checkAuthorization, checkAdmin, CreateProduct);

//to create product
// /api/product/:id
// protected route
router.put("/:id", checkAuthorization, checkAdmin, UpdateProduct);

//to create review and add to the product
// /api/product/:id/reviews
// protected route
router.post("/:id/reviews", checkAuthorization, createReview);

module.exports = router;
