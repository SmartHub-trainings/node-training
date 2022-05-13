let avg = (a, b) => (a + b) / 2;

const isPalindrone = (str) => str === str.split("").reverse().join("");

// let arePalindrone = (str1, str2) => {
//   const firstIspalindrone = str1 === str1.split("").reverse().join("");
//   const secondIspalindrone = str2 === str2.split("").reverse().join("");

// };
let arePalindrone = (str1, str2) => {
  const firstIspalindrone = isPalindrone(str1);
  const secondIspalindrone = isPalindrone(str2);
  return firstIspalindrone && secondIspalindrone;
};

module.exports = { average: avg, arePalindrone: arePalindrone };
