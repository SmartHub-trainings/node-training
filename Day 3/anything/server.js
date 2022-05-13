const http = require("http");
const fs = require("fs");

const attribute = {
  name: "Victor",
  profession: "Womanizer",
  age: 34,
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      fs.readFile("./index.html", "utf-8", (err, data) => {
        if (err) {
          res.end("404");
        } else {
          res.write(data);
          res.end();
        }
      });

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
