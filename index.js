const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const MONGO_URI = require("./config/mongooUri").MONGOO_DB_URI;
const withAuth = require("./express-middleware/authMiddleware");
//Route for user
const user = require("./routes/user");

const app = express();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log("Mongoo connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// app.get("/", function(req, res) {
//   res.send("Hi there");
// });
app.use("/api/user", user);

app.get("/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Server up on 5000");
});
