const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  const {
    productItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (productItems.length <= 0) {
    return res.status(400).json({ message: "No items in cart" });
  }

  try {
    let createdOrder = await Order.create({
      user: req.user._id,
      productItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(200).json(createdOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  let id = req.params.id;

  try {
    let data = await Order.findById(id).populate("user", "email name");

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

const updateOrdertoPay = async (req, res) => {
  let id = req.params.id;

  try {
    let data = await Order.findById(id);

    if (!data) {
      return res.status(400).json({ message: "Order not available" });
    }

    let updated = await Order.findByIdAndUpdate(
      id,
      {
        isPaid: true,
        paidAt: Date.now(),
      },
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

const allorders = async (req, res) => {
  userId = req.user._id;

  try {
    let data = await Order.find({ user: userId });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Internal Server error" });
  }
};

const getAllorders = async (req, res) => {
  try {
    let data = await Order.find().populate("user");

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Internal Server error" });
  }
};

const updateOrdertoDelivered = async (req, res) => {
  let id = req.params.id;

  try {
    let data = await Order.findById(id);

    if (!data) {
      return res.status(400).json({ message: "Order not available" });
    }

    let updated = await Order.findByIdAndUpdate(
      id,
      {
        isDelivered: true,
        deliveredAt: Date.now(),
      },
      {
        new: true,
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrdertoPay,
  allorders,
  getAllorders,
  updateOrdertoDelivered,
};
