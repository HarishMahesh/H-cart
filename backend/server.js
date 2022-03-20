const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const cors = require("cors");
const path = require("path");

dotenv.config();

connectToDb();

app.use(cors());
app.use(express.json());

app.use("/api/product", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

let port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started in the port ${port}`));

// --------------------------deployment------------------------------
__dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
// --------------------------deployment------------------------------
