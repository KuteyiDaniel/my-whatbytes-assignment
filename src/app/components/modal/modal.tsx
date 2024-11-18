"use client";
import React, { useState } from "react";
import "./modal.scss";
import Image from "next/image";
import ModalImage from '../../../../public/html5-logo.png';
import { TbCircleNumber1Filled, TbCircleNumber3Filled } from "react-icons/tb";
import { PiNumberCircleTwoFill } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean; // Determines if the modal is visible
  onClose: () => void; // Function to close the modal
  onSave: (updatedData: { rank: string; percentile: string; score: string }) => void; // Corrected types
  initialData: { rank: string; percentile: string; score: string }; // Corrected types
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [rank, setRank] = useState<string>(initialData.rank);
  const [percentile, setPercentile] = useState<string>(initialData.percentile);
  const [score, setScore] = useState<string>(initialData.score);
  const [errors, setErrors] = useState<{ rank?: string; percentile?: string }>({});

  const validateField = (field: string, value: string) => {
    let errorMessage = "";

    if (field === "rank") {
      if (value === "" || value === null || value === undefined) {
        errorMessage = "required | should be a number";
      } else if (isNaN(Number(value))) {
        errorMessage = "required | should be a number";
      }
    }

    if (field === "percentile") {
      if (value === "" || value === null || value === undefined) {
        errorMessage = "required| percentile 0-100";
      } else if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100) {
        errorMessage = "required| percentile 0-100";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const handleSave = () => {
    // Validate all fields before saving
    validateField("rank", rank);
    validateField("percentile", percentile);

    if (Object.values(errors).some((error) => error)) {
      return; // Don't proceed if there are errors
    }

    onSave({ rank, percentile, score }); // Pass updated data to parent
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <header>Update scores</header>
          <Image className="modal-image" src={ModalImage} alt="html5" />
        </div>

        <div className="modal-body">
          <div className="form-group">
            <div className="label-container">
              <TbCircleNumber1Filled /> <label htmlFor="percentile">Update your <b>Rank</b></label>
            </div>
            <div className="input-field">
              <input
                id="rank"
                type="text"
                className={errors.rank ? "error-input" : ""}
                value={rank}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setRank(value);
                  validateField("rank", value); // Validate immediately on change
                }}
              />
              {errors.rank && <small className="error">{errors.rank}</small>}
            </div>
          </div>

          <div className="form-group">
            <div className="label-container">
              <PiNumberCircleTwoFill /> <label htmlFor="percentile">Update your <b>Percentile</b></label>
            </div>
            <div className="input-field">
              <input
                id="percentile"
                type="text"
                className={errors.percentile ? "error-input" : ""}
                value={percentile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setPercentile(value); // Allow clearing the field
                  validateField("percentile", value); // Validate immediately on change
                }}
              />
              {errors.percentile && <small className="error">{errors.percentile}</small>}
            </div>
          </div>

          <div className="form-group">
            <div className="label-container">
              <TbCircleNumber3Filled /> <label htmlFor="percentile">Update your <b>Current Score (out of 15)</b></label>
            </div>
            <div className="input-field">
              <input
                id="score"
                type="text"
                value={score}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScore(e.target.value)}
              />
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleSave} className="save-button">
            Save <FaArrowRight />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
