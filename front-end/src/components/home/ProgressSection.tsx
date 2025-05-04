import React from "react";

const stats = [
  { label: "Day Streak", value: "7" },
  { label: "Signs Learned", value: "42" },
  { label: "Current Level", value: "Silver" },
  { label: "Total Exp", value: "2500" },
];

const ProgressSection = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 flex flex-col md:flex-row md:items-center md:justify-between my-24 ">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Your Progress
        </h2>
        <p className="text-sm text-gray-500">Keep up the great work!</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-xl font-semibold text-blue-600">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSection;
