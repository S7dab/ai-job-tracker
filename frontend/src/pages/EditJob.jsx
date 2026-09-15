import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

function EditJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  //   loading state
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const initialization = {
    company: "",
    position: "",
    location: "",
    status: "",
    applicationDate: "",
    jobUrl: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialization);

  // handling fetching job data
  const handleFatchJobData = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      console.log("response", response);
      setJob(response.data.job);
      setFormData({
        company: response.data.job.company,
        position: response.data.job.position,
        location: response.data.job.location,
        status: response.data.job.status,
        applicationDate: response.data.job.applicationDate.split("T")[0],
        jobUrl: response.data.job.jobUrl,
        notes: response.data.job.notes || "",
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  //   handle input change box
  const handleInputChangeBox = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((preData) => ({ ...preData, [name]: value }));
  };

  useEffect(() => {
    handleFatchJobData();
  }, [id]);

  //   handling update form submit
  const navigate = useNavigate();
  const handleUpdateFormBtn = async (e) => {
    try {
      setUpdating(true);
      e.preventDefault();
      const response = await api.put(`/jobs/${id}`, formData);

      if(response.status===200){
        toast.success(response.data.message)
         setTimeout(() => {
        navigate(`/jobs/${id}`);
      }, 700);
      }
     
    } catch (error) {
      console.log("error", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" p-6">
      <h1 className=" text-3xl font-bold">Edit Job</h1>
      {job && (
        // form part
        <form onSubmit={handleUpdateFormBtn} className="mt-6 space-y-4">
          {/* company name input */}
          <div>
            <input
              type="text"
              name="company"
              onChange={handleInputChangeBox}
              value={formData.company}
              className="input input-bordered w-full"
              placeholder="Company"
            />
          </div>
          {/* position input */}
          <div>
            <input
              type="text"
              name="position"
              onChange={handleInputChangeBox}
              value={formData.position}
              className="input input-bordered w-full"
              placeholder="Position"
            />
          </div>
          {/*  location input */}
          <div>
            <input
              type="text"
              name="location"
              onChange={handleInputChangeBox}
              value={formData.location}
              className="input input-bordered w-full"
              placeholder="Location"
            />
          </div>
          {/* application date input */}
          <div>
            <input
              type="date"
              name="applicationDate"
              onChange={handleInputChangeBox}
              value={formData.applicationDate}
              className="input input-bordered w-full"
            />
          </div>
          {/* select status input */}
          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChangeBox}
              className="select select-bordered w-full"
            >
              <option value="">Select Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          {/* Job Url input */}
          <div>
            <input
              type="text"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleInputChangeBox}
              className="input input-bordered w-full"
              placeholder="Job URL"
            />
          </div>
          {/* notes input */}
          <div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChangeBox}
              className="textarea textarea-bordered w-full"
              placeholder="Notes"
            />
          </div>

          <div>
            <button
              type="submit"
              className=" btn btn-primary"
              disabled={updating}
            >
              {updating ? (
                <>
                  <span className=" loading loading-spinner">Updating...</span>
                </>
              ) : (
                "Update Job"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditJob;
