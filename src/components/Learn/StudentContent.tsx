import React from "react";
import next from "../assets/images/next.svg";
import previous from "../assets/images/previous.svg";
import parser from "html-react-parser";
import ReactPlayer from "react-player/lazy";
import { OnProgressProps } from "react-player/base";
import { useAppSelector } from "../../store/hooks";

const StudentContent = ({
  currentStep,
  nextStep,
  previousStep,
  totalSteps,
}: any) => {
  const { content } = useAppSelector((state) => state);
  const [duration, setDuration] = React.useState({ current: 0, total: 0 });

  return (
    <div className="w-full h-full flex bg-gray-100 rounded-r-lg">
      <ReactPlayer
        style={{
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
        }}
        width="50%"
        height="100%"
        url={content[currentStep - 1].url}
        config={{
          youtube: {
            playerVars: { showinfo: 0 },
          },
        }}
        onProgress={(e: OnProgressProps) => {
          let current = { ...duration };
          current.current = e.playedSeconds;
          setDuration(current);
        }}
        onDuration={(d: number) => {
          setDuration({ current: 0, total: d });
        }}
        onEnded={() => {
          currentStep !== totalSteps && nextStep();
        }}
      />

      <div className="w-1/2 h-full flex flex-col">
        <div className="w-full h-[10%] flex items-center justify-center font-semibold text-xl gap-2 px-2">
          {content[currentStep - 1].title}
        </div>
        <div className="w-full h-[80%] overflow-y-auto bg-transparent pl-10 pr-4">
          {parser(content[currentStep - 1].content)}
        </div>
        <div className="w-full h-[10%] flex items-center justify-end  px-2 gap-4 relative">
          {currentStep > 1 && (
            <img
              onClick={() => {
                previousStep();
              }}
              className="cursor-pointer"
              src={previous}
              alt="PREVIOUS"
            />
          )}
          {currentStep !== totalSteps && (
            <img
              onClick={() => {
                nextStep();
              }}
              className="cursor-pointer"
              src={next}
              alt="NEXT"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-200">
            <div
              style={{
                width: `${
                  duration.current <= 0
                    ? "0"
                    : duration.current >= 100
                    ? "100%"
                    : Math.trunc((duration.current / duration.total) * 100)
                }%`,
              }}
              className={`h-full bg-blue-600`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentContent;
