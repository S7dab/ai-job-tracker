import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import RecentJob from "../components/RecentJob";
import api from "../services/api";
import JobStatusChart from "../components/JobStatusChart";
import ApplicationTrendChart from "../components/ApplicationTrendChart"
import { BriefcaseBusiness, CalendarCheck, Send } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  // using context 
  const {user} = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  // handling fetching all jobs
  const handleFetchJob = async () => {
    try {
      const response = await api.get("/jobs");

      setJobs(response.data.allJobs);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleFetchJob();
  }, []);

  // 
//  const chartData = Object.values(
//   jobs.reduce((acc, job) => {
//     const date = new Date(job.applicationDate).toLocaleDateString();

//     if (!acc[date]) {
//       acc[date] = {
//         date,
//         applications: 0,
//       };
//     }

//     acc[date].applications += 1;

//     return acc;
//   }, {})
// );

//   console.log("chard",chartData)
  return (

    <div className="min-h-screen flex flex-col">
       {/* navbar */}
      <div className=" fixed top-0 left-0 w-full z-10">
        <Navbar/>
      </div >
       <div className="flex w-full min-w-0 mt-15">
      <div className="flex-1 p-4 sm:p-6">
        <h1 className="text-3xl font-bold">Welcome,<span className=" text-red-300">{user?.name}</span></h1>
        <p className=" text-base-content/60 mt-1">
          Track your job search in one place
        </p>
        {/* Stat cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">

  {/* Total Jobs */}
  <div className="card bg-base-200 border border-base-content/10 shadow-sm hover:shadow-md transition">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title">Total Jobs</h2>
          <p className="text-base-content/60 text-sm">
            All applications
          </p>
        </div>

        <BriefcaseBusiness size={28} />
      </div>

      <p className="text-4xl font-bold mt-2">
        {jobs.length}
      </p>
    </div>
  </div>


  {/* Applied */}
  <div className="card bg-base-200 border border-base-content/10 shadow-sm hover:shadow-md transition">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title">Applied</h2>
          <p className="text-base-content/60 text-sm">
            Applications sent
          </p>
        </div>

        <Send size={28} />
      </div>

      <p className="text-4xl font-bold mt-2">
        {jobs.filter((job) => job.status === "Applied").length}
      </p>
    </div>
  </div>


  {/* Interviews */}
  <div className="card bg-base-200 border border-base-content/10 shadow-sm hover:shadow-md transition">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title">Interviews</h2>
          <p className="text-base-content/60 text-sm">
            Interview opportunities
          </p>
        </div>

        <CalendarCheck size={28} />
      </div>

      <p className="text-4xl font-bold mt-2">
        {jobs.filter((job) => job.status === "Interview").length}
      </p>
    </div>
  </div>


  {/* Offers */}
  <div className="card bg-base-200 border border-base-content/10 shadow-sm hover:shadow-md transition">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title">Offers</h2>
          <p className="text-base-content/60 text-sm">
            Job offers received
          </p>
        </div>

        <BriefcaseBusiness size={28} />
      </div>

      <p className="text-4xl font-bold mt-2">
        {jobs.filter((job) => job.status === "Offer").length}
      </p>
    </div>
  </div>


  {/* Rejected */}
  <div className="card bg-base-200 border border-base-content/10 shadow-sm hover:shadow-md transition">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title">Rejected</h2>
          <p className="text-base-content/60 text-sm">
            Applications rejected
          </p>
        </div>

        <Send size={28} />
      </div>

     <div>
       <p className="text-4xl font-bold mt-2">
        {jobs.filter((job) => job.status === "Rejected").length}
      </p>
     </div>
    </div>
  </div>

</div>
        {/* Job Status Chart Component */}
        <div className="mt-8">
          <JobStatusChart jobs={jobs} />
        </div>

        {/* Application trend Chart */}
        <div className=" mt-8">
          <ApplicationTrendChart jobs={jobs}/>
        </div>
        {/* recent jobs or application*/}

        <div id="Job" className="mt-8">
          <RecentJob jobs={jobs} />
        </div>

      </div>
    </div>
    <Footer/>
    </div>

   
  );
}

export default Dashboard;
