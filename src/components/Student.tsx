import React from "react";
import StepWizard from "react-step-wizard";
import { demoData } from "../utils/constants";
import StudentContent from "./StudentContent";

const Student = () => {
  return (
    <div className="w-5/6 h-2/3 flex items-center">
      <video
        className="w-1/2 h-full"
        controls
        src="https://www.youtube.com/watch?v=aUJN30Dm6F4"
      ></video>
      <div className="w-1/2 h-full flex flex-col bg-yellow-300">
        <StepWizard className="w-full h-full">
          {demoData.map((item, index) => (
            <StudentContent key={index} />
          ))}
        </StepWizard>
      </div>
    </div>
  );
};

export default Student;
