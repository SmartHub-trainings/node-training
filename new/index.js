import express from "express";

const app = express();

app.listen(500, (err) => {
  console.log("Now listening to port 5000");
});
