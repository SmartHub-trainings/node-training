// const myModule = require("./module");

// console.log(myModule);

// console.log(myModule.arePalindrone("madam", "none"));
const { average, arePalindrone } = require("./module");
const fs = require("fs");

console.log(arePalindrone("madam", "none"));
console.log(average(45, 20));

fs.writeFile(
  "./results.txt",
  `Madam and none are palindrone?${arePalindrone("madam", "none")}`,
  (err) => {
    if (err) {
      console.log("Be careful");
    } else {
      fs.appendFile(
        "./results.txt",
        `\nAverage of 45 and 50 is ${average(45, 50)}`,
        (er) => {
          if (err) console.log("E no work");
          else console.log("All Done");
        }
      );
    }
  }
);
