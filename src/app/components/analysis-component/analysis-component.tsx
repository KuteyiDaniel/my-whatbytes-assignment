import React from "react";
import '../../../app/home.scss'

// Function to determine scale colors based on percentage
const getScaleColor = (percentage: number) => {
  if (percentage <= 40) return { color: "rgb(249,85,86)", bg: "rgba(249,85,86,0.3)", textColor:"rgb(249,85,86)" }; // Red
  if (percentage <= 60) return { color: "rgb(253,132,62)", bg: "rgba(253,132,62,0.3)",  textColor:"rgb(253,132,62)"  }; // Orange
  if (percentage <= 80) return { color: "rgb(59, 125, 246)", bg: "rgba(59, 125, 246, 0.3)",  textColor:"rgb(59, 125, 246)" }; // Blue
  return { color: "rgb(43, 192, 103)", bg: "rgba(43, 192, 103, 0.3)", textColor:"rgb(43, 192, 103)"  }; // Green
};

// Component for individual analysis
const Analysis = ({ title, percentage }: { title: string; percentage: number }) => {
  const { color, bg, textColor } = getScaleColor(percentage);

  return (
    <div className="analysis">
      <header>{title}</header>
      <div className="scale-information-container">
        {/* Scale container with background */}
        <div className="scale-container" style={{ backgroundColor: bg }}>
          {/* Scale bar with dynamic width and color */}
          <div className="scale" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
        </div>
        {/* Display percentage */}
        <b style={{color: textColor}}>{percentage}%</b>
      </div>
    </div>
  );
};

export default Analysis