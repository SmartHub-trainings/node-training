const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url === "/") {
        fs.readFile("./index.html", "utf-8", (err, data) => {
          res.end(data);
        });
      }
      if (req.url === "/reviews") {
        fs.readFile("./reviews.txt", "utf-8", (err, data) => {
          //   console.log(data.split("\n"));
          const theItems = { data: data.split("\n") };

          //   let count = 0;
          //   for (let line of data.split("\n")) {
          //     theItems[count] = line.split(",");
          //     count++;
          //   }
          res.end(JSON.stringify(theItems));
        });
      }
  }
});
const port = 7000;

server.listen(port, (err) => {
  if (err) {
    console.log("Something went wrong");
    console.log(err);
  } else {
    console.log(`Server is running at http://localhost:${port}`);
  }
});
