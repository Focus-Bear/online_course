import React from "react";
import StepWizard from "react-step-wizard";
import { demoData } from "../utils/constants";
import AuthorContent from "./AuthorContent";

const Author = () => {
  return (
    <div className="w-3/4 h-3/4 flex items-center">
      <StepWizard className="w-full h-full">
        {demoData.map((item, index) => (
          <AuthorContent key={index} />
        ))}
      </StepWizard>
    </div>
  );
};

export default Author;
