const http = require("http");

const attribute = {
  name: "Victor",
  profession: "Womanizer",
  age: 34,
};

// const server = http.createServer((req, res) => {
//   if (req.url === "/" || req.url === "/home") {
//     res.write("<h1>Welcome to my Page</h1>");
//     res.write("<h2>Are you New?</h2>");
//     res.end();
//   } else if (req.url === "/profile") {
//     // res.write(attribute);
//     res.write(JSON.stringify(attribute));

//     res.end();
//   }
// });
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.write("<h1>Welcome to my Page</h1>");
      res.write("<h2>Are you New?</h2>");
      res.end();
      break;
    case "/profile":
      res.write(JSON.stringify(attribute));

      res.end();
      break;
    default:
      res.end("404");
  }
});

server.listen(6001, () => {
  console.log("Listening to Port 6001");
});
