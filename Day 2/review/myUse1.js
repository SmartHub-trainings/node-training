// const myModule = require("./module");

// console.log(myModule);

// console.log(myModule.arePalindrone("madam", "none"));
// const { average, arePalindrone } = require("./module");
// const fs = require("fs").promises;

// console.log(arePalindrone("madam", "none"));
// console.log(average(45, 20));

// fs.writeFile(
//   "./results.txt",
//   `Madam and none are palindrone?${arePalindrone("madam", "none")}`
// ).then(() => {
//   fs.appendFile(
//     "./results.txt",
//     `\nAverage of 45 and 50 is ${average(45, 50)}`
//   ).then(() => {
//     console.log("All Done");
//   });
// });

const { average, arePalindrone } = require("./module");
const fs = require("fs").promises;

console.log(arePalindrone("madam", "none"));
console.log(average(45, 20));

fs.writeFile(
  ".ss//results2.txt",
  `Madam and none are palindrone?${arePalindrone("madam", "none")}`
)
  .then(appendToFile)
  .catch((err) => {
    console.log("You did something wrong");
    console.log(err);
  });

function appendToFile() {
  fs.appendFile(
    "./results2.txt",
    `\nAverage of 45 and 50 is ${average(45, 50)}`
  ).then(printDone);

  function printDone() {
    console.log("All Done");
  }
}
