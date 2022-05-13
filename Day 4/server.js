const { createServer } = require("http");
const sendHTML = require("./controller/senfHTML");
const { writeFile, appendFile, readFile } = require("fs");
const users = [];

const server = createServer((req, res) => {
  // serve views or pages
  if (req.method == "GET") {
    const theUrl = req.url.toLowerCase();
    if (theUrl === "/" || theUrl === "/home" || theUrl === "/index") {
      sendHTML("index.html", res);
    }
    if (theUrl === "/login") {
      sendHTML("login.html", res);
    }
    if (theUrl === "/register") {
      sendHTML("register.html", res);
    }
  }

  // serve json content: api endpoint
  if (req.method == "POST") {
    const theUrl = req.url.toLowerCase();
    if (theUrl === "/login") {
      sendHTML("login.html", res);
    }
    if (theUrl === "/register") {
      req.setEncoding("utf8");
      let result;
      req.on("data", (chunk) => {
        result = JSON.parse(chunk);

        // appendFile("./users.json", "\n" + chunk, (err) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     res.end("All Done");
        //   }
        // });
      });
      req.on("end", () => {
        console.log(users);
        readFile("./users.json", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const usersData = JSON.parse(data);
            const newCont = [...usersData.data, result];
            writeFile("./users.json", JSON.stringify({ data: newCont }), () => {
              console.log("Done");
            });
          }
        });
        res.end(JSON.stringify({ num: users.length }));
      });
    }
  }
});

const port = 6005;
server.listen(port, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log(`Server Running at http://localhost:${port}`);
  }
});
