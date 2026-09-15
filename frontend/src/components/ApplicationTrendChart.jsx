import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ApplicationTrendChart({jobs}) {

    // chart data 
    const chartData = jobs.reduce((acc, job) => {
  const date = new Date(job.applicationDate);

  const dateKey = date.toISOString().split("T")[0];

  const existingDate = acc.find((item) => item.dateKey === dateKey);

  if (existingDate) {
    existingDate.applications += 1;
  } else {
    acc.push({
      dateKey,
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
      applications: 1,
    });
  }

  return acc;
}, []);

chartData.sort(
  (a, b) => new Date(a.dateKey) - new Date(b.dateKey)
);

  return (
    <div id='analytics'>
        <div className="card bg-base-200 shadow-sm p-4">
    <h2 className="text-xl font-bold mb-4">
      Applications Over Time
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="applications"
          stroke="#3b82f6"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
    </div>
  )
}

export default ApplicationTrendChart