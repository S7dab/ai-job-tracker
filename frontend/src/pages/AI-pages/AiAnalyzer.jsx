import React, { useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

function AiAnalyzer() {
  // state
  const initialization = {
    jobTitle: "",
    jobDescription: "",
    skills: "",
  };
  const [aiFormData, setAiFormData] = useState(initialization);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // handling input change box
  const handleInputChangeBox = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAiFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // handling ai form submit data
  const handleAiFormDataSubmit = async (e) => {
    try {
      setLoading(true);
      setError("");
      setResult(null);
      e.preventDefault();
      const response = await api.post("/ai/analyze-job", aiFormData);

      setResult(response.data.result);
    } catch (error) {
      console.log("error", error);
      setError("Unable to analyze this job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // if(loading){
  //     return <Loading/>
  // }
  return (
    <div>
      {/*form part */}
      <div className="p-6">
        <h1 className="text-3xl font-bold">AI Job Analyzer</h1>

        <form onSubmit={handleAiFormDataSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="jobTitle"
            value={aiFormData.jobTitle}
            onChange={handleInputChangeBox}
            placeholder="Job Title"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="jobDescription"
            value={aiFormData.jobDescription}
            onChange={handleInputChangeBox}
            placeholder="Job Description"
            className="textarea textarea-bordered w-full"
            rows="6"
            required
          />

          <textarea
            name="skills"
            value={aiFormData.skills}
            onChange={handleInputChangeBox}
            placeholder="Your Skills (React, JavaScript, Node.js...)"
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          />

          <div className=" space-x-2">
           {
             loading?<button className="btn btn-primary">
              <span className="loading loading-spinner">loading...</span>
            </button> : <button type="submit" className="btn btn-primary">
              Analyze Job
            </button>
           }

            <Link to={"/dashboard"} className="btn btn-primary">
              Go home
            </Link>
          </div>
        </form>
      </div>
      {error && (
        <div className=" alert alert-error mt-6">
          <span>{error}</span>
        </div>
      )}
      {/* result part  */}
      {
        result && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">AI Analysis Result</h2>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Match Score</span>
                    <span className="font-bold">{result.matchScore}%</span>
                  </div>

                  <progress
                    className="progress progress-primary w-full"
                    value={result.matchScore}
                    max="100"
                  ></progress>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Matching Skills</h4>

                  <div className="flex flex-wrap gap-2">
                    {result.matchingSkills.map((skill) => (
                      <span key={skill} className="badge badge-success">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Missing Skills</h4>

                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill) => (
                      <span key={skill} className="badge badge-error">
                        ✗ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Analysis</h4>
                  <p>{result.analysis}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Recommendation</h4>

                  <span
                    className={`badge ${
                      result.recommendation === "Apply"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {result.recommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default AiAnalyzer;
