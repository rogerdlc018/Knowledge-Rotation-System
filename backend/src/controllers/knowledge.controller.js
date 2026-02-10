const pool = require("../config/db");

const createKnowledge = async (req, res) => {
  try {
    const { name, description } = req.body || {};

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }

    const result = await pool.query(
      "INSERT INTO knowledge (name, description) VALUES ($1, $2) RETURNING *",
      [name, description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create knowledge" });
  }
};

const getKnowledge = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM knowledge ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get knowledge" });
  }
};

module.exports = {
  createKnowledge,
  getKnowledge,
};