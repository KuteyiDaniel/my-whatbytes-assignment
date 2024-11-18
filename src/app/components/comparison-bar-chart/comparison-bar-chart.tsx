"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { TooltipItem } from 'chart.js';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define prop types
interface ComparisonChartProps {
  userPercentile: number; // User's percentile
  averagePercentile: number; // Average percentile for comparison
}

// Shared chart options
const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: TooltipItem<'line'>) {
          if (context.datasetIndex === 0) return `Your Percentile: ${context.raw}`;
          if (context.datasetIndex === 1) return `Average Percentile: ${context.raw}`;
          return ''; // Ensure the function always returns a string
        },
      },
    },
    legend: {
      display: true,
      position: "top" as const,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Percentile (%)",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Students",
      },
      min: 0,
      max: 100,
    },
  },
};

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  userPercentile,
  averagePercentile,
}) => {
  const [chartData, setChartData] = useState({
    labels: [0, 25, 50, 75, 100], // X-axis values (percentile intervals)
    datasets: [
      {
        label: "Your Performance",
        data: [10, 30, 60, 90, userPercentile], // Dynamically updated data
        borderColor:  "#C0BEDD", 
        backgroundColor: "transparent",
        pointBackgroundColor: "#C0BEDD", 
        tension: 0.9, // curve
      },
      {
        label: "Average Performance",
        data: [15, 35, 65, 85, averagePercentile], // Example data
        borderColor: "#2196F3", // Blue for average line
        backgroundColor: "transparent",
        pointBackgroundColor: "#2196F3",
        tension: 0.9,
      },
    ],
  });

  useEffect(() => {
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: [10, 30, 60, 90, userPercentile], // Update user's data
        },
        {
          ...prev.datasets[1],
          data: [15, 35, 65, 85, averagePercentile], // Update average data
        },
      ],
    }));
  }, [userPercentile, averagePercentile]);

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Line style={{width: "100%"}} data={chartData} options={chartOptions} />
    </div>
  );
};

export default ComparisonChart;
