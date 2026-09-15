import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api';
import { SquarePen } from 'lucide-react';

function JobDetailsPage() {

  const navigate = useNavigate();
    const {id}= useParams();
    const [job,setJob]= useState(null);

    const handleFetchOneJob = async ()=>{
        try {
            const response = await api.get(`/jobs/${id}`);
            setJob(response.data.job)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        handleFetchOneJob()
    },[id])
  return (
    <div>
        {/* heading */}
        <div className='p-6'>
            <h1 className=' text-3xl font-bold'>Job Details</h1>
        </div>
        {/* job details part */}
        {job && (
  <div className="card bg-base-200 shadow-sm mt-6">
    <div className="card-body">

      <h2 className="card-title">{job.company}</h2>

      <p>
        <span className="font-semibold">Position:</span>{" "}
        {job.position}
      </p>

      <p>
        <span className="font-semibold">Location:</span>{" "}
        {job.location}
      </p>

      <p>
        <span className="font-semibold">Status:</span>{" "}
        {job.status}
      </p>

      <p>
        <span className="font-semibold">Application Date:</span>{" "}
        {new Date(job.applicationDate).toLocaleDateString()}
      </p>

      <p>
        <span className="font-semibold">Notes:</span>{" "}
        {job.notes || "No notes"}
      </p>

     {
        job.jobUrl && (
            <a href={job.jobUrl}  target="_blank" rel='noonpener noreferrer' className=' btn btn-primary w-fit mt-4'> view Job Posting</a>
        )
     }

     {/* edit btn */}
<button onClick={()=>navigate(`/jobs/${id}/edit`)} className=' btn btn-secondary w-fit mt-2'><SquarePen />Edit Job</button>
    </div>
  </div>
)}
    </div>
  )
}

export default JobDetailsPage