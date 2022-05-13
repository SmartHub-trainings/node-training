const http = require("http");
const print = console.log;
// print(http);

http
  .createServer((request, response) => {
    print(request.method);
    print(request.url);
    // response.write("I received your request");
    // response.end();
    response.write("I received your request");
    response.end("You're doing well");
  })
  .listen(4000, (err) => {
    if (err) {
      console.error(err);
    } else {
      print("Server Listening to port 4000");
    }
  });
