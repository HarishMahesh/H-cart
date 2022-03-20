const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const checkAuthorization = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(400).json({ message: "Invalid Token or token missing" });
  } else {
    token = token.split(" ")[1];
    try {
      let decoded = await jwt.verify(token, process.env.JWT_SECRET);

      let userid = decoded.id;

      if (userid) {
        let user = await User.findById(userid).select("-password");

        if (user) {
          req.user = user;

          next();
        } else {
          res.status(400).json({ message: "Invalid Token or token missing" });
        }
      } else {
        res.status(400).json({ message: "Invalid Token or token missing" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Invalid Token or token missing" });
    }
  }
};

module.exports = checkAuthorization;
