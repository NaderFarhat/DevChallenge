const express = require("express");

const app = express();

const pool = require("./db");

app.use(express.json()); //=> req.body

//Routes

//get all todos

app.get("/historics", async (req, res) => {
  try {
    const allHist = await pool.query("SELECT* FROM hist");

    res.json(allHist.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//get a todo

app.get("/historic/:id", async (req, res) => {
  console.log("req.params", req.params);
  const { id } = req.params;
  try {
    const hist = await pool.query("SELECT * FROM hist WHERE hist_id= $1", [id]);
    res.json(hist.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//create a todo

app.post("/historic/create", async (req, res) => {
  try {
    const { language } = req.body;
    const newHist = await pool.query(
      "INSERT INTO hist (language) VALUES ($1) RETURNING *",
      [language]
    );

    res.json(newHist.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/historic/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.body;

    const updateHist = await pool.query(
      "UPDATE hist SET language = $1 WHERE hist_id = $2",
      [language, id]
    );

    res.json("TODO was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/historic/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteHist = await pool.query("DELETE FROM hist WHERE hist_id= $1", [
      id,
    ]);

    res.json("deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete all

app.delete("/historic/delete", async (req, res) => {
  try {
    const deleteHist = await pool.query("DELETE FROM hist ");

    res.json("deleted all!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(8080, () => {
  console.log("listening port 8080");
});
