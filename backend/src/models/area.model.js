const pool = require("../config/db");

const createArea = async (name, description) => {
  const result = await pool.query(
    "INSERT INTO areas (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return result.rows[0];
};

const getAllAreas = async () => {
  const result = await pool.query("SELECT * FROM areas ORDER BY id ASC");
  return result.rows;
};

module.exports = {
  createArea,
  getAllAreas,
};