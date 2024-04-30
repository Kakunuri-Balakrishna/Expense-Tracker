import "./style.css";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CustomPieChart = ({ data }) => {
  // Assuming data is in the format [{category: "Food", price: 23}, {category: "Clothing", price: 40}, ...]
  // Generate random colors for each category
  const COLORS = [
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#82ca9d",
    "#FF5733",
  ];

  return (
    <div className="charts-wrapper">
      <PieChart width={280} height={200}>
        <Pie
          data={data}
          dataKey="price"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={20}
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
