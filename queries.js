const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

const getAllConfigurations = (request, response) => {
  let query = `SELECT * FROM configjson`;
  pool.query(query, (error, results) => {
    if (error) {
      response.status(400).send("error connecting to database");
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getConfigurationData = (request, response) => {
  let query = `SELECT * FROM configjson WHERE name = ${request.params.name}`;
  pool.query(query, (error, results) => {
    if (error) {
      response.status(400).send("error connecting to database");
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getConfigurationData,
  getAllConfigurations,
};
