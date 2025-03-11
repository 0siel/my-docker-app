const express = require("express");
const { Pool } = require("pg");

//Connect to postgreSQL using environment variables
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "mydb",
});

const app = express();
app.use(express.json());

//Basic route: returns a welcome message
app.get("/", (req, res) => {
  res.send("Hello from Node + Postgres Docker App!");
});

//Example route to get all users from the 'users' table
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users;");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

//Example route to add a new user to the 'users' table
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }
  try {
    await pool.query("INSERT INTO users (name, email) VALUES ($1, $2);", [
      name,
      email,
    ]);
    res.send("User added successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding user");
  }
});

//Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
