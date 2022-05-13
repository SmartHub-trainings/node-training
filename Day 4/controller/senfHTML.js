const { readFile } = require("fs");
module.exports = (path, res) => {
  readFile(`./views/${path}`, "utf-8", (err, content) => {
    if (err) {
      console.error(err);
    } else {
      res.end(content);
    }
  });
};
