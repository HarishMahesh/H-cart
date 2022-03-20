const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

const fetchAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

fetchTopRatedProducts = async (req, res) => {
  try {
    let products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const fetchSelectedProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).populate("reviews");

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const CreateProduct = async (req, res) => {
  let { name, description, price, image, brand, category, countInStock } =
    req.body;
  try {
    let product = await Product.create({
      name,
      description,
      price,
      image,
      brand,
      category,
      countInStock,
      user: req.user._id,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const UpdateProduct = async (req, res) => {
  let { name, description, price, image, brand, category, countInStock } =
    req.body;
  try {
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        image,
        brand,
        category,
        countInStock,
      },
      {
        new: true,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const changeStock = async (req, res) => {
  let { countInStock } = req.body;
  if (countInStock < 0) {
    res.status(400).json({ message: "Count cannot be lessthan zero" });
  }
  try {
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        countInStock: countInStock,
      },
      {
        new: true,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  let { rating, comment } = req.body;
  try {
    let product = await Product.findById(req.params.id).populate("reviews");
    if (!product) {
      return res.status(400).json({ message: "Product not available" });
    }

    let allreadyReviewd = product.reviews.filter((u) => {
      return u.user.toString() === req.user._id.toString();
    });

    if (allreadyReviewd.length > 0) {
      return res
        .status(400)
        .json({ message: "User allready posted the review" });
    }

    let review = await Review.create({
      name: req.user.name,
      rating: parseInt(rating),
      comment,
      user: req.user._id,
    });

    let totalRating = parseInt(rating);

    for (let i in product.reviews) {
      totalRating = totalRating + product.reviews[i].rating;
    }

    product.reviews.push(review._id);

    let length = product.reviews.length;

    let outRating = totalRating / length;

    let updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        reviews: product.reviews,
        numReviews: length,
        rating: outRating,
      },
      {
        new: true,
      }
    ).populate("reviews");

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetchAllProducts,
  fetchSelectedProduct,
  deleteProduct,
  CreateProduct,
  UpdateProduct,
  changeStock,
  createReview,
  fetchTopRatedProducts,
};
