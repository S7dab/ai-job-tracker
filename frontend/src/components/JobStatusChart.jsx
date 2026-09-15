import { Bold } from "lucide-react";
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function JobStatusChart({ jobs }) {
  const chartData = [
    {
      name: "Applied",
      value: jobs.filter((job) => job.status === "Applied").length,
    },
    {
      name: "Interview",
      value: jobs.filter((job) => job.status === "Interview").length,
    },
    {
      name: "Offer",
      value: jobs.filter((job) => job.status === "Offer").length,
    },
    {
      name: "Rejected",
      value: jobs.filter((job) => job.status === "Rejected").length,
    },
  ];
  return (
    <div id="ChartBoard" className=" card bg-base-200 shadow-sm p-4">
      <h2 className=" text-xl font-bold">Job Status</h2>
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
          <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={100}
          paddingAngle={3}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.name === "Applied"
                  ? "#f59e0b"
                  : entry.name === "Interview"
                    ? "#3b82f6"
                    : entry.name === "Offer"
                      ? "#22c55e"
                      : "#ef4444"
              }
            />
          ))}
        </Pie>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <tspan x="50%" dy="-5" fontSize="20" fontWeight="Bold">
            {jobs.length}
          </tspan>
          <tspan x="50%" dy="25" fontSize="14">
            Total Jobs
          </tspan>
        </text>
        <Tooltip
          formatter={(value, name) => {
            const percentage = jobs.length
              ? ((value / jobs.length) * 100).toFixed(1)
              : 0;
            return [`${value} (${percentage}%)`, name];
          }}
        />
        <Legend verticalAlign="bottom" align="center" layout="horizontal" />
      </PieChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
}

export default JobStatusChart;
