import React from "react";
import StepWizard from "react-step-wizard";
import { useAppSelector } from "../store/hooks";
import StudentContent from "./StudentContent";

const Student = () => {
  const { content } = useAppSelector((state) => state);

  return (
    <div className="w-5/6 h-3/4 flex flex-col">
      <StepWizard className="w-full h-full">
        {content.map((_, index) => (
          <StudentContent key={index} id={index} />
        ))}
      </StepWizard>
    </div>
  );
};

export default Student;
