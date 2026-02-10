const pool = require("../config/db");

const createArea = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await pool.query(
      "INSERT INTO areas (name, description) VALUES ($1, $2) RETURNING *",
      [name, description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create area" });
  }
};

const getAreas = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, description, created_at FROM areas ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch areas" });
  }
};

const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await pool.query(
      `UPDATE areas
       SET name = $1,
           description = $2
       WHERE id = $3
       RETURNING *`,
      [name, description || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update area" });
  }
};

const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM areas WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.json({ message: "Area deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete area" });
  }
};

module.exports = {
  createArea,
  getAreas,
  updateArea,
  deleteArea,
};