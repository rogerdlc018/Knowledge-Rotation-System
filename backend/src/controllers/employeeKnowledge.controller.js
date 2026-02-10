const pool = require("../config/db");

const assignKnowledge = async (req, res) => {
  try {
    const { employee_id, knowledge_id, level } = req.body || {};

    if (!employee_id || !knowledge_id || level === undefined) {
      return res.status(400).json({
        error: "employee_id, knowledge_id and level are required",
      });
    }

    const employeeExists = await pool.query(
      "SELECT 1 FROM employees WHERE id = $1",
      [employee_id],
    );
    if (employeeExists.rowCount === 0) {
      return res.status(400).json({ error: "Employee not found" });
    }

    const knowledgeExists = await pool.query(
      "SELECT 1 FROM knowledge WHERE id = $1",
      [knowledge_id],
    );
    if (knowledgeExists.rowCount === 0) {
      return res.status(400).json({ error: "Knowledge not found" });
    }

    const result = await pool.query(
      `
      INSERT INTO employee_knowledge (employee_id, knowledge_id, level)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [employee_id, knowledge_id, level],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to assign knowledge" });
  }
};

const getEmployeeKnowledge = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        ek.id,
        e.full_name,
        k.name AS knowledge,
        ek.level,
        ek.created_at
      FROM employee_knowledge ek
      JOIN employee e ON e.id = ek.employee_id
      JOIN knowledge k ON k.id = ek.knowledge_id
      ORDER BY ek.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get employee knowledge" });
  }
};

module.exports = {
  assignKnowledge,
  getEmployeeKnowledge,
};
