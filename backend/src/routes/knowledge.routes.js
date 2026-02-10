const express = require("express");
const router = express.Router();
const {
  createKnowledge,
  getKnowledge,
} = require("../controllers/knowledge.controller");

router.post("/", createKnowledge);
router.get("/", getKnowledge);

module.exports = router;