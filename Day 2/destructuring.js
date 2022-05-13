const person = {
  name: "Smith",
  age: 16,
  track: "Full Stack",
  likes: ["Swimming", "Singing", "Dancing", "Cooking"],
};

// console.log(person);

// let username = person.name;
// console.log(username);
// let age = person.age;
// console.log(`${username} is ${age} years old`);
// let name = person.name;
// console.log(username);
// let age = person.age;
// let { name, age, likes } = person;
let { name: hisName, age: newAge, likes } = person;

console.log(
  `${hisName} is ${newAge} years old and he likes the following ${likes}`
);
