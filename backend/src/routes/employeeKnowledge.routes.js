const express = require("express");
const router = express.Router();

const {
  assignKnowledge,
  getEmployeeKnowledge,
} = require("../controllers/employeeKnowledge.controller");

// GET
router.get("/", getEmployeeKnowledge);

// POST
router.post("/", assignKnowledge);

module.exports = router;