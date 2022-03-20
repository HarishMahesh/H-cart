const jwt = require("jsonwebtoken");

const getJWTtoken = async (user) => {
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  return token;
};

module.exports = getJWTtoken;
