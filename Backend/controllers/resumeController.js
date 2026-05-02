const { calculateSimilarity } = require("../utils/nlpUtils");
const Resume = require("../models/Resume");
const extractTextFromPDF = require("../utils/pdfParser");

const advancedScore = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file || !jobDescription) {
      return res.status(400).json({
        message: "Missing file or job description",
      });
    }

    const resumeText = await extractTextFromPDF(req.file.path);

    const score = Math.round(
      calculateSimilarity(resumeText, jobDescription) * 100
    );

    const newResume = new Resume({
      resumeText,
      jobDescription,
      score,
    });

    await newResume.save();

    res.status(200).json({
      message: "Resume uploaded & scored successfully",
      score,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  advancedScore,
  getResumes,
};