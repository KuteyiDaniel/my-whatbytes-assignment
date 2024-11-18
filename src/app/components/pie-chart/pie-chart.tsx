import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC<{ statistics: { rank: number; percentile: number; score: string } }> = ({
  statistics,
}) => {
  const doughnutData = {
    labels: ["Your Percentile", "Remaining Percentile"],
    datasets: [
      {
        data: [statistics.percentile, 100 - statistics.percentile],
        backgroundColor: ["rgb(59, 125, 246)", "#E0E0E0"], 
        // borderColor: ["#388E3C", "#BDBDBD"], 
        // borderWidth: 2,
        hoverBackgroundColor: ["rgba(59, 125, 246, 0.7)", "#E0E0E0"], 
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: "70%", // Defines the "donut hole" size
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: { size: 14 },
          color: "#333", // Custom legend text color
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => `${context.label}: ${context.raw}%`,
        },        
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  return  <div style={{ width: "250px", height: "250px", margin: "auto" }}>
  <Doughnut data={doughnutData} options={doughnutOptions} />
</div>
};

export default DoughnutChart;
