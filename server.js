const express = require('express');
const validator = require('validator');

const app = express();

app.listen(5000, () => {
  console.log(`Listening on port 5000`);
});

app.get(`/`, (req, res) => {
    res.send(`<h1>Hello there! its working</h1>`);
});

//1. Be Polite, Greet the User
app.get(`/greetings/:username`, (req, res) => {
    res.send(`<h1>Hello there, ${req.params.username}!</h1>`);
});

//2. Rolling the Dice
app.get(`/roll/:number`, (req, res) => {
    if (!isNaN(req.params.number)){
        n = Math.floor(Math.random() * req.params.number);
        res.send(`<h1>You rolled a ${n}.</h1>`);
    }
    else {
        res.send(`You must specify a number`);
    }
});

//3. I Want THAT One!
 const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
app.get(`/collectibles/:index`, (req, res) => {
    if (collectibles[req.params.index] == undefined){
        res.send(`You must specify a number`);
    }
    else {
        res.send(`So, you want the ${collectibles[req.params.index].name}? For ${collectibles[req.params.index].price}, it can be yours!`);
    }
});

//4. Filter Shoes by Query Parameters
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", (req, res) => {
  let results = shoes;

  let minPrice;
  if (req.query["min-price"]) {
    minPrice = parseInt(req.query["min-price"], 10);
  } else {
    minPrice = null;
  }

  let maxPrice;
  if (req.query["max-price"]) {
    maxPrice = parseInt(req.query["max-price"], 10);
  } else {
    maxPrice = null;
  }

  let type;
  if (req.query.type) {
    type = req.query.type.toLowerCase();
  } else {
    type = null;
  }

  if (minPrice !== null) {
    results = results.filter(function(shoe) {
      return shoe.price >= minPrice;
    });
  }

  if (maxPrice !== null) {
    results = results.filter(function(shoe) {
      return shoe.price <= maxPrice;
    });
  }

  if (type !== null) {
    results = results.filter(function(shoe) {
      return shoe.type.toLowerCase() === type;
    });
  }

  res.json(results);
});




