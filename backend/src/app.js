require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const employeeKnowledgeRoutes = require("./routes/employeeKnowledge.routes");
const knowledgeRoutes = require("./routes/knowledge.routes");
const employeeRoutes = require("./routes/employee.routes");
const areaRoutes = require("./routes/area.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/employee-knowledge", employeeKnowledgeRoutes);
app.use("/api/knowledge", knowledgeRoutes);
app.use("/api/areas", areaRoutes);
app.use("/api/employees", employeeRoutes);

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection error", err);
  } else {
    console.log("Database connected:", result.rows[0]);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Knowledge Rotation System API running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});