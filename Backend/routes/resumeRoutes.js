const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { advancedScore, getResumes } = require("../controllers/resumeController");

router.post("/advanced-score", upload.single("resume"), advancedScore);

router.get("/resumes", getResumes);

module.exports = router;