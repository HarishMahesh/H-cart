const checkAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(400).json({ message: "User is not Admin" });
  }
};

module.exports = checkAdmin;
