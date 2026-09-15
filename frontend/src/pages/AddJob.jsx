import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddJob() {
  const initialization = {
    company: "",
    position: "",
    location: "",
    status: "",
    applicationDate: "",
    jobUrl: "",
    notes: "",
  };
  const [addFormData,setAddFormData] = useState(initialization);

//   handling input change box
const handleInputChangeBox = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddFormData((prevData)=>({...prevData,[name]:value}));
}

// handle add details form btn
const navigate = useNavigate();
const handleAddFormDetailsBtn = async (e)=> {
    try {
        e.preventDefault();
        const response = await api.post("/jobs",addFormData);

        console.log("response",response.data);

        if(response.status===201){
          toast.success(response.data.message)
          setTimeout(() => {
            navigate("/jobs");
          }, 700);
        }
        

    } catch (error) {
      toast.error(error.response.data.message);
        console.log("error",error);
    }
}
  return (
    <div className=" p-6">
      <h1 className=" text-3xl font-bold">Add Job</h1>
      {/* form */}
      <div>
        <form onSubmit={handleAddFormDetailsBtn} className="mt-6 space-y-4">

  <input
    type="text"
    name="company"
    value={addFormData.company}
    onChange={handleInputChangeBox}
    className="input input-bordered w-full"
    placeholder="Company"
  />

  <input
    type="text"
    name="position"
    value={addFormData.position}
    onChange={handleInputChangeBox}
    className="input input-bordered w-full"
    placeholder="Position"
  />

  <input
    type="text"
    name="location"
    value={addFormData.location}
    onChange={handleInputChangeBox}
    className="input input-bordered w-full"
    placeholder="Location"
  />

  <input
    type="date"
    name="applicationDate"
    value={addFormData.applicationDate}
    onChange={handleInputChangeBox}
    className="input input-bordered w-full"
  />

  <select
    name="status"
    value={addFormData.status}
    onChange={handleInputChangeBox}
    className="select select-bordered w-full"
  >
    <option value="">Select Status</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  </select>

  <input
    type="text"
    name="jobUrl"
    value={addFormData.jobUrl}
    onChange={handleInputChangeBox}
    className="input input-bordered w-full"
    placeholder="Job URL"
  />

  <textarea
    name="notes"
    value={addFormData.notes}
    onChange={handleInputChangeBox}
    className="textarea textarea-bordered w-full"
    placeholder="Notes"
  />

 <div className=" space-x-2">
   <button
    type="submit"
    className="btn btn-primary"
  >
    Add Job
  </button>

   <Link to={"/jobs"}
    className="btn btn-primary"
  >
    Go back
  </Link>
 </div>

</form>
      </div>
    </div>
  );
}

export default AddJob;
