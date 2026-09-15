import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Trash } from "lucide-react";
import Loading from "../components/Loading";

function JobsPage() {
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const navigate = useNavigate();

  // handling fetch all jobs
  const handleFethingAllJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/jobs");

      setAllJobs(response.data.allJobs);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFethingAllJobs();
  }, []);

  // handling delete button by id
  const handleDeleteBtn = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) {
      return;
    }
    try {
      setIsDeleting(id);
      await api.delete(`/jobs/${id}`);

      setAllJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center p-3">
  <h1 className="text-3xl font-bold">My Jobs</h1>

  <div className=" space-x-2">
    <button
    onClick={() => navigate("/jobs/add")}
    className="btn btn-primary"
  >
    Add Job
  </button>
    <Link to={"/dashboard"}
    className="btn btn-primary"
  >
     Go back
  </Link>
  </div>
</div>
      {/* all job part  */}
      {/* Desktop Table */}
<div className="hidden md:block overflow-x-auto mt-6">
  <table className="table">
    <thead>
      <tr>
        <th>Company</th>
        <th>Position</th>
        <th>Status</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {allJobs.map((job) => (
        <tr key={job._id}>
          <td>{job.company}</td>
          <td>{job.position}</td>
          <td>{job.status}</td>
          <td>
            {new Date(job.applicationDate).toLocaleDateString()}
          </td>

          <td>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="btn btn-sm btn-primary"
              >
                <Eye />
                View Job
              </button>

              <button
                onClick={() => handleDeleteBtn(job._id)}
                disabled={isDeleting === job._id}
                className="btn btn-sm btn-error"
              >
                {isDeleting === job._id ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <Trash />
                    Delete
                  </>
                )}
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Mobile Cards */}
<div className="md:hidden mt-6 px-3 space-y-4">
  {allJobs.map((job) => (
    <div
      key={job._id}
      className="card bg-base-200 shadow-sm"
    >
      <div className="card-body p-4">

        <h2 className="card-title">
          {job.company}
        </h2>

        <p>
          <span className="font-semibold">Position:</span>{" "}
          {job.position}
        </p>

        <p>
          <span className="font-semibold">Status:</span>{" "}
          {job.status}
        </p>

        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(job.applicationDate).toLocaleDateString()}
        </p>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="btn btn-sm btn-primary flex-1"
          >
            <Eye />
            View Job
          </button>

          <button
            onClick={() => handleDeleteBtn(job._id)}
            disabled={isDeleting === job._id}
            className="btn btn-sm btn-error flex-1"
          >
            {isDeleting === job._id ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Trash />
                Delete
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default JobsPage;
