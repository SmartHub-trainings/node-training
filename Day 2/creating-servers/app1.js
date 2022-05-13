const http = require("http");
const print = console.log;
// print(http);

http
  .createServer((request, response) => {
    print(request.method);
    print(request.url);
    if (request.url === "/about") {
      response.write("You're on the about page");
      response.end("\nYou're doing well");
    } else if (request.url === "/contact") {
      response.write("Thanks for contacting us");
      response.end("\nYou're doing well");
    } else if (request.url === "/") {
      response.write('<h1 style="color:green;">Welcome</h1>');
      response.end("\nYou're doing well");
    } else {
      response.write("404\nPage not found");
      response.end("\nYou're not doing well");
    }
  })
  .listen(4000, (err) => {
    if (err) {
      console.error(err);
    } else {
      print("Server Listening to port 4000");
    }
  });
