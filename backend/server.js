const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Database setup
const db = new sqlite3.Database("./data/reviews.db");
// Check if the table exists and create it if not
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      reviewText TEXT NOT NULL,
      dateAdded TEXT DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table 'reviews' is ready.");
      }
    }
  );
});

// API Endpoints
app.get("/reviews", (req, res) => {
  db.all("SELECT * FROM reviews", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/reviews", (req, res) => {
  const { title, author, rating, reviewText } = req.body;
  console.log("Received data:", req.body); // Log incoming data
  db.run(
    `INSERT INTO reviews (title, author, rating, reviewText) VALUES (?, ?, ?, ?)`,
    [title, author, rating, reviewText],
    function (err) {
      console.error(err.message);
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put("/reviews/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, rating, reviewText } = req.body;
  db.run(
    `UPDATE reviews SET title = ?, author = ?, rating = ?, reviewText = ? WHERE id = ?`,
    [title, author, rating, reviewText, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

app.delete("/reviews/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM reviews WHERE id = ?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
