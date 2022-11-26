import StepWizard from "react-step-wizard";
import { useAppSelector } from "../../store/hooks";
import AuthorContent from "./AuthorContent";

const Author = () => {
  const { content } = useAppSelector((state) => state);

  return (
    <div className="w-3/4 h-3/4 flex items-center">
      <StepWizard className="w-full h-full rounded-md">
        {content.map((_, index) => (
          <AuthorContent key={index} />
        ))}
      </StepWizard>
    </div>
  );
};

export default Author;
