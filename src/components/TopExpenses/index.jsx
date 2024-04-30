import "./style.css";

import React from "react";
import {
  BarChart,
  Bar,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
} from "recharts";

const TopExpensesGraph = ({ data }) => {
  // Sort the data by price in descending order
  console.log(data);
  const sortedData = [...data].sort((a, b) => b.price - a.price);

  return (
    <div className="top-expenses-container">
      <h3>Top Expenses</h3>
      <div className="top-expenses-graph">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              {/* <CartesianGrid /> */}
              <XAxis
                type="number"
                dataKey="price"
                domain={[0, "datamaX"]}
                axisLine={false}
                tickLine={false}
                hide={true}
              />

              <YAxis
                type="category"
                dataKey="category"
                axisLine={false} // Remove axis line
                tickLine={false}
                interval={0}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#8884d8" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <h4 id="empty-cont">Empty😔</h4>
        )}
      </div>
    </div>
  );
};

export default TopExpensesGraph;
