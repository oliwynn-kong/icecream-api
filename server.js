const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory data storage
let flavors = [
  { id: 1, name: "Vanilla", stock: 50 },
  { id: 2, name: "Chocolate", stock: 40 },
  { id: 3, name: "Strawberry", stock: 30 },
];
let orders = [];


const os = require('os');
// Get the hostname of the server
const hostname = os.hostname();


// Routes

// Get all flavors
app.get("/flavors", (req, res) => {
  res.json(flavors);
  console.log(`the hostname is: ${hostname}`);
});

// Get a flavor by ID
app.get("/flavors/:id", (req, res) => {
  const flavor = flavors.find((f) => f.id === parseInt(req.params.id));
  if (!flavor) return res.status(404).send("Flavor not found.");
  res.json(flavor);
  console.log(`the hostname is: ${hostname}`);
});

// Add a new flavor
app.post("/flavors", (req, res) => {
  const { name, stock } = req.body;
  const newFlavor = { id: flavors.length + 1, name, stock };
  flavors.push(newFlavor);
  res.status(201).json(newFlavor);
  console.log(`the hostname is: ${hostname}`);
});

// Update a flavor
app.put("/flavors/:id", (req, res) => {
  const flavor = flavors.find((f) => f.id === parseInt(req.params.id));
  if (!flavor) return res.status(404).send("Flavor not found.");

  const { name, stock } = req.body;
  if (name) flavor.name = name;
  if (stock !== undefined) flavor.stock = stock;

  res.json(flavor);
  console.log(`the hostname is: ${hostname}`);
});

// Delete a flavor
app.delete("/flavors/:id", (req, res) => {
  const index = flavors.findIndex((f) => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Flavor not found.");
  
  const deletedFlavor = flavors.splice(index, 1);
  res.json(deletedFlavor);
});

// Place an order
app.post("/orders", (req, res) => {
  const { flavorId, quantity } = req.body;
  const flavor = flavors.find((f) => f.id === flavorId);

  if (!flavor) return res.status(404).send("Flavor not found.");
  if (flavor.stock < quantity)
    return res.status(400).send("Insufficient stock.");

  flavor.stock -= quantity;
  const order = {
    id: orders.length + 1,
    flavorId,
    quantity,
    date: new Date(),
  };
  orders.push(order);
  res.status(201).json(order);
  console.log(`the hostname is: ${hostname}`);
});

// Get all orders
app.get("/orders", (req, res) => {
  res.json(orders);
  console.log(`the hostname is: ${hostname}`);
});

// Server setup
app.listen(port, () => {
  console.log(`Ice Cream API is running at http://localhost:${port}`);
});
