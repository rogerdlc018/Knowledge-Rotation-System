const express = require("express");
const router = express.Router();

const {
  createArea,
  getAreas,
  updateArea,
  deleteArea,
} = require("../controllers/area.controller");

router.post("/", createArea);
router.get("/", getAreas);
router.put("/:id", updateArea);
router.delete("/:id", deleteArea);

module.exports = router;