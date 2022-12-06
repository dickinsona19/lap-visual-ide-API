const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const queries = require("./queries");
const destructive = require("./destructiveQueries");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/initTest", (request, response) => {
  response.statusCode = 200;
  response.json({ info: "Request Received" });
});
//get queries
app.get("/getConfigJSON/:name", queries.getConfigurationData);
app.get("/getAllConfigs", queries.getAllConfigurations);

//destructiveQueries
app.post("/updateConfiguration", destructive.updateConfigurationData);
app.post("/insertNewConfiguration", destructive.insertNewConfiguration);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
