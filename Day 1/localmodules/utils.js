let randomSquare = (x) => {
  return x * x;
};

let returnStatus = (name) => {
  if (name.charAt(0).toLowerCase() === "d") {
    return "Not Eligible";
  }
  return "Eligible";
};
// console.log(randomSquare(8));
// console.log(returnStatus("Dan"));

module.exports = {
  a: randomSquare,
  b: returnStatus,
};
