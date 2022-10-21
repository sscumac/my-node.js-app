const express = require("express");
const app = express();
const port = 8000;
const db = require("./queries");
const utils = require("./utils");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("random", utils.setRandomValue(4));

  next();
});

app.get("/", (request, response) => {
  response.json({ info: "The Store App" });
});
app.get("/products", db.getProducts);
app.get("/products/:id", db.getProductById);
app.put("/products/:id", db.updateProduct);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
