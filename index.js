import express from "express";

// For production purpose, just for the deployement. Because we can not use port 3000 directly in the code this will give you the error at the time of the deployement

// require("dotenv").config();   // If this is not working try differrent methods

import "dotenv/config";

import logger from "./logger.js";
import morgan from "morgan";

// How do you want your information to be printed on console log as logging format
// morganFormat is a variable which will be used to format the log messages

const morganFormat = ":method :url :status :response-time ms";

// Create an express application

const app = express();

// Middle-ware

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Port for communication to listen a request and respond to it.
// process.env.PORT is a variable from .env file

const port = 3000 || process.env.PORT;

/* app.get("/", (req, res) => {
  res.send("Hello from Prabhat Jaiswar.");
});

app.get("/ice-tea", (req, res) => {
  res.send("What ice tea would you prefer ?");
});

app.get("/twitter", (req, res) => {
  res.send("prabhat30720");
}); */

// Accept all the data which is coming in the JSON format

app.use(express.json());

// Array to store the tea data
let teaData = [];
// Id to keep a track of each element in the teaData Array
let nextId = 1;

// Whenever you want to save the data in databse the post method is considered to be the best way

// Add a new Tea

app.post("/teas", (req, res) => {
  // logger.info("A post request is made to add a new tea");
  logger.warn("A post request is made to add a new tea");
  // req.body is given by express framework
  // req.body comes from POSTMAN
  // req.body.name and req.body.price ---> data is in the JSON format
  // Destructuring the data
  const { name, price } = req.body;
  //   creating a new Object
  const newTea = { id: nextId++, name, price };
  // Pushing the object into the array
  teaData.push(newTea);
  res.status(200).send(newTea);
});

// Route to get all Teas

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// To fetch the details from the url use params, it will return the value in string format

// Get a Tea with id

app.get("/teas/:id", (req, res) => {
  // find() method check every single entity of teaData array and returns thee matched entity
  // getting data from body we use req.body and if getting data from URL we use req.params
  const tea = teaData.find(
    (arrayItem) => arrayItem.id === parseInt(req.params.id)
  );

  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// Update Tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find(
    (arrayItem) => arrayItem.id === parseInt(req.params.id)
  );

  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  // req.body comes from POSTMAN
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// Delete Tea

app.delete("/teas/:id", (req, res) => {
  // Finding the Tea index
  const teaIndex = teaData.findIndex(
    (arrayItem) => arrayItem.id === parseInt(req.params.id)
  );

  if (teaIndex === -1) {
    return res.status(404).send("Tea not found");
  }
  // splice() is also used to delete the index from an array i.e. splice(indexToBeDeleted, Number of items to be deleted);
  teaData.splice(teaIndex, 1);
  return res.status(200).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
