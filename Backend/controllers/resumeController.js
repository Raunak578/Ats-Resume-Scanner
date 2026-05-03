const { calculateSimilarity } = require("../utils/nlpUtils");
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


module.exports = {
  advancedScore,
};