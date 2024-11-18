"use client";

import "../app/home.scss";
import { useState } from "react";
import Image from "next/image";

import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import ComparisonChart from "./components/comparison-bar-chart/comparison-bar-chart";
import Modal from "./components/modal/modal";
import Analysis from "./components/analysis-component/analysis-component";
import DoughnutChart from "./components/pie-chart/pie-chart";

import TestImage from "../../public/html5-logo.png";
import TrophyImage from "../../public/cup_1039330.png";
import ChartImage from "../../public/computer_16601769.png";
import CheckImage from "../../public/check_16799608.png";

export default function Home() {
  // Constants
  const averagePercentile = 72; // Average percentile of engineers
  const analysisData = [
    { title: "HTML Tools, Forms, History", percentage: 80 },
    { title: "Tags & References in HTML", percentage: 50 },
    { title: "Tables & References in HTML", percentage: 24 },
    { title: "Tables & CSS Basics", percentage: 90 },
  ];

  // State Management
  const [isModalOpen, setModalOpen] = useState(false);
  const [statistics, setStatistics] = useState({
    rank: 1,
    percentile: 30,
    score: "10",
  });

  // Modal Handlers
  const handleUpdateClick = () => setModalOpen(true);
  const handleModalSave = (updatedData: { rank: string; percentile: string; score: string }) => {
    setStatistics({
      rank: Number(updatedData.rank),
      percentile: Number(updatedData.percentile),
      score: updatedData.score,
    });
    setModalOpen(false); // Close modal after saving
  };

  return (
    <div className="skill__section">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
        initialData={{
          rank: String(statistics.rank),
          percentile: String(statistics.percentile),
          score: statistics.score,
        }}
      />

      <Navbar />

      <div className="main__content">
        <Sidebar />

        <div className="content">
          <div className="statistics-section">
            <header className="section-header">Skill Test</header>

            <div className="test-detail-container detail-style">
              <Image src={TestImage} className="test-image" alt="html5" />
              <div className="test-details">
                <header className="test-name">Hyper Text Markup Language</header>
                <span>
                  Questions: 08 | Duration: 15mins | Submitted on 17th November 2024
                </span>
              </div>
              <button className="update-button" onClick={handleUpdateClick}>
                Update
              </button>
            </div>

            <div className="quick-statistics detail-style">
              <header>Quick Statistics</header>
              <div className="quick-statistic-details">
                <div className="rank-percentile-container">
                  <div className="rank-percentile">
                    <Image src={TrophyImage} alt="trophy" />
                    <div>
                      <b>{statistics.rank}</b>
                      <p className="stat">YOUR RANK</p>
                    </div>
                  </div>

                  <div className="rank-percentile">
                    <Image src={ChartImage} alt="chart" />
                    <div>
                      <b>{statistics.percentile}%</b>
                      <p className="stat">YOUR PERCENTILE</p>
                    </div>
                  </div>
                </div>

                <div className="correct-answers">
                  <Image src={CheckImage} alt="check-icon" />
                  <div>
                    <b>{statistics.score}/15</b>
                    <p className="stat">CORRECT ANSWERS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="comparison-container detail-style">
              <header>Comparison Graph</header>
              <div>
                <div className="comparison-details">
                  <b>You scored {statistics.percentile}% percentile</b>, which is lower than
                  the average percentile {averagePercentile}% of the engineers who took this
                  assessment.
                </div>
                <ComparisonChart
                  userPercentile={statistics.percentile}
                  averagePercentile={averagePercentile}
                />
              </div>
            </div>
          </div>

          <div className="analysis-section">
            <div className="syllabus-analysis-container detail-style">
              <header className="syllabus-header">Syllabus Wise Analysis</header>
              {analysisData.map((item, index) => (
                <Analysis key={index} title={item.title} percentage={item.percentage} />
              ))}
            </div>

            <div className="question-analysis-container detail-style">
              <div className="question-analysis-header">
                <header>Question Analysis</header>
                <span>{statistics.score}/15</span>
              </div>
              <p>
                <b>You scored {statistics.score} questions correct out of 15.</b> However, it
                will still need some improvement.
              </p>
              <DoughnutChart statistics={statistics} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
