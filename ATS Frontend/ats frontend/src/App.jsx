import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:5000";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file || !jobDesc) {
      alert("Please upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDesc);

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/resume/advanced-score`,
        formData
      );

      setScore(response.data.score);
    } catch (error) {
      console.error("FULL ERROR:", error);

      if (error.response) {
        alert(error.response.data.error || "Server error");
      } else {
        alert("Backend not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>ATS Resume Scanner</h1>

        <label>Upload Resume (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />

        <label>Job Description</label>
        <textarea
          rows="6"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job description..."
        />

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Get ATS Score"}
        </button>

        {score !== null && (
          <div className="result">
            <h2>{score}% Match</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;