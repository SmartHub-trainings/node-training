const { createServer } = require("http");
const { readFile } = require("fs");

const server = createServer((req, res) => {
  const url = req.url;
  console.log(url);
  if (url === "/" || url === "/index") {
    // res.end("Working");
    readFile("./views/index.html", "utf-8", (err, content) => {
      if (err) console.error(err);
      else res.writeHead(200, "ok", { "Content-type": "text/html" });
      res.end(content);
    });
  }
});

const port = 5000;

server.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server Running at http://localhost:${port}`);
  }
});
