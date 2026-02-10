const pool = require("../config/db");

const createEmployee = async (req, res) => {
  try {
    const { full_name, role, area_id } = req.body;

    const result = await pool.query(
      `INSERT INTO employees (full_name, role, area_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [full_name, role, area_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT e.id, e.full_name, e.role, e.is_active, e.created_at,
              a.name AS area
       FROM employees e
       JOIN areas a ON e.area_id = a.id
       ORDER BY e.id ASC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, role, area_id, is_active } = req.body;

    const result = await pool.query(
      `UPDATE employees
       SET full_name = $1,
           role = $2,
           area_id = $3,
           is_active = $4
       WHERE id = $5
       RETURNING *`,
      [full_name, role, area_id, is_active, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE employees
       SET is_active = false
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deactivated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};