const express = require("express");
const {
  createOrder,
  getOrderById,
  updateOrdertoPay,
  allorders,
  getAllorders,
  updateOrdertoDelivered,
} = require("../controllers/orderController");
const checkAdmin = require("../middleware/checkAdmin");
const checkAuthorization = require("../middleware/checkAuthorization");

const router = express();

router.post("/", checkAuthorization, createOrder);
router.get("/", checkAuthorization, checkAdmin, getAllorders);
router.get("/myorders", checkAuthorization, allorders);

router.get("/:id", checkAuthorization, getOrderById);

router.put(
  "/:id/delivered",
  checkAuthorization,
  checkAdmin,
  updateOrdertoDelivered
);

router.put("/:id", checkAuthorization, updateOrdertoPay);
module.exports = router;
