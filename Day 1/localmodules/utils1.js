module.exports = {
  a: (x) => {
    return x * x;
  },
  b: (name) => {
    if (name.charAt(0).toLowerCase() === "d") {
      return "Not Eligible";
    }
    return "Eligible";
  },
};
