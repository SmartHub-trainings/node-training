const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://shopping-app:shopping-app@cluster0.redg5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const ProductSchema = new mongoose.Schema({
  // title:String,
  title: {
    type: String,
    required: true,
  },
  inStock: {
    type: Number,
    default: 10,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", ProductSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
//routes for get
app.get("/products", async (req, res) => {
  // return res.send("Get all Products");
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    console.log(error);
  }
});
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.find({ _id: id });
  return res.json(product[0]);
});

//routes for post
// app.post("/products", (req, res) => {
//   //   return res.send("Added new product");
//   const body = req.body;
//   const product = new Product(body);
//   product
//     .save()
//     .then((data) => {
//       console.log("data Saved");
//       return res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
app.post("/products", async (req, res) => {
  //   return res.send("Added new product");
  try {
    const body = req.body;
    const product = new Product(body);
    const data = await product.save();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//routes for put
app.put("/products/:id", (req, res) => {
  return res.send("Modified product");
});

//routes for put
app.delete("/products/:id", (req, res) => {
  return res.send("Deleted product");
});

const PORT = 6005;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running on port " + PORT);
  }
});
