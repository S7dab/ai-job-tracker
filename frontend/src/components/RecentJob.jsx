import React from "react";
import { useNavigate } from "react-router-dom";

function RecentJob({jobs}) {
    
    // handling status badge bg color
  const handleStatusBadge = (status) =>{
    if(status === "Applied"){
        return "badge-warning";
    }
    if(status === "Interview"){
        return "badge-info";
    }
    if(status === "Offer"){
        return "badge-success";
    }
    if(status === "Rejected"){
        return "badge-error";
    }

    return "badge-ghost";
  }
//   handling view all jobs btn
  const navigate = useNavigate();

  // recent job filtering 
  const recentJob = [...jobs].sort((a,b)=> new Date(b.applicationDate)-new Date(a.applicationDate)).slice(0,4);
  return (
    <div id="job">
      <h2 className="text-xl font-bold mb-4">Recent Applicatin</h2>
      {/* tables  */}

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          {/* jobs */}
          <tbody>
            {recentJob.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.position}</td>
                <td>
                  <span className={`badge ${handleStatusBadge(job.status)}`}>{job.status}</span>
                </td>
                <td>{new Date(job.applicationDate).toLocaleDateString()}</td>
              </tr>
))}
          </tbody>
        </table>
        <div className=" mt-4 text-right">
          <button onClick={()=>navigate("/jobs")}  className=" btn btn-primary">View All Jobs</button>
        </div>
      </div>
    </div>
  );
}

export default RecentJob;
