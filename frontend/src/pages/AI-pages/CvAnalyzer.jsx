import React, { useRef, useState } from "react";
import api from "../../services/api.js";
import { Link } from "react-router-dom";

function CvAnalyzer() {
  // state
  const [cvFile, setCvFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
// use ref
const fileInputRef = useRef(null);
  // handling analyze click btn
  const handleAnalyzeCvBn = async () => {
    if (!cvFile) {
      setError("Please upload your CV firs.");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const formData = new FormData();
      formData.append("cv", cvFile);

      // handling ai cv analyze api calling
      const response = await api.post("/cv/analyze", formData);

      setResult(response.data.result);

      console.log("response", result);
    } catch (error) {
      console.log("CV analysis error", error);
    } finally {
      setLoading(false);
    }
  };
  
//   handling clear button
const handleClearFileBtn = () => {
    setCvFile(null);
    fileInputRef.current.value="";
}

// for score 
const getScoreStatus = (score) => {
  if (score < 40) return "Needs Improvement";
  if (score < 70) return "Fair";
  if (score < 85) return "Good";
  return "Excellent";
};
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Upload Section */}
      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          <div className=" flex justify-between items-center">
            <h1 className="text-2xl font-bold">AI CV Analyzer</h1>
          <Link to={"/dashboard"} className=" bg-slate-600 text-center rounded-xl w-20 hover:text-blue-400">Go back</Link>
          </div>

          <p className="opacity-70">
            Upload your CV and get AI-powered feedback.
          </p>

          <input
          ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => setCvFile(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />

          {error && <p className="text-error">{error}</p>}

          {loading ? (
            <button className="btn btn-primary w-full md:w-auto">
              <span className="loading loading-spinner"></span>
              Loading...
            </button>
          ) : (
            <button
              onClick={handleAnalyzeCvBn}
              type="button"
              className="btn btn-primary w-full md:w-auto"
            >
              Analyze CV
            </button>
          )}
          {/* clear button */}
          <button onClick={handleClearFileBtn} type="button" className=" btn btn-outline">Clear</button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Score */}
          <div className="w-full max-w-md">
  <div className="flex justify-between mb-2">
    <span className="font-semibold">CV Score</span>
    <span>{result.score}/100</span>
  </div>

  <progress
    className="progress progress-primary w-full"
    value={result.score}
    max="100"
  ></progress>

  <p className=" font-semibold">{getScoreStatus(result.score)}</p>
</div>

          {/* Summary */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">CV Summary</h2>

              <p className="leading-relaxed">{result.summary}</p>
            </div>
          </div>

          {/* Strengths */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Strengths</h2>

              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex gap-2">
                    <span>✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weaknesses */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Weaknesses</h2>

              <ul className="space-y-2">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex gap-2">
                    <span>✕</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing Skills */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Missing Skills</h2>

              <ul className="space-y-2">
                {result.missingSkills.map((skill, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suggestions */}
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Suggestions</h2>

              <ul className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex gap-2">
                    <span>💡</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CvAnalyzer;
