require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const CodeBlock = require('../models/CodeBlock');
const connectDB = require('../config/database');

const initialCodeBlocks = [
  {
    title: 'Async Function',
    code: 'async function fetchData() {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(\'Error:\', error);\n  }\n}',
    solution: 'async function fetchData(props) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(\'Error:\', error);\n  }\n}'
  },
  {
    title: 'Promise Chain',
    code: 'fetch(url)\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(\'Error:\', error));',
    solution: 'fetch(url, options)\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(\'Error:\', error));',
  },
  {
    title: 'Array Methods',
    code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconst evens = numbers.filter(num => num % 2 === 0);\nconst sum = numbers.reduce((acc, num) => acc + num, 0);',
    solution: 'let numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconst evens = numbers.filter(num => num % 2 === 0);\nconst sum = numbers.reduce((acc, num) => acc + num, 0);'
  },
  {
    title: 'Class Definition',
    code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  sayHello() {\n    console.log(`Hello, my name is ${this.name}`);\n  }\n}',
    solution: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  sayHello() {\n    console.log(`Hey! My name is ${this.name}`);\n  }\n}'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await CodeBlock.deleteMany({});
    await CodeBlock.insertMany(initialCodeBlocks);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();