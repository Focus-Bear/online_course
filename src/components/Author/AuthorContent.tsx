import React from "react";
import add from "../assets/images/add.svg";
import next from "../assets/images/next.svg";
import previous from "../assets/images/previous.svg";
import link from "../assets/images/link.png";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarModules } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateContent, addNewContent } from "../store/reducer/content";

const AuthorContent = ({
  currentStep,
  nextStep,
  previousStep,
  totalSteps,
}: any) => {
  const dispatch = useAppDispatch();
  const { content } = useAppSelector((state) => state);

  React.useEffect(() => {
    content.length !== 1 && nextStep();
  }, [content.length]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[10%] flex items-center bg-gray-300 gap-2 px-2 rounded-t-md relative">
        <div className="font-semibold">{`Title ${currentStep}`}</div>
        <input
          className="w-2/3 outline-none rounded px-2 py-0.5 text-sm font-medium tracking-wide focus:bg-gray-50"
          value={content[currentStep - 1].title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              updateContent({
                position: currentStep - 1,
                type: "title",
                data: e.target.value,
              })
            );
          }}
        />
        <div className="absolute bottom-0 right-1 text-xs font-bold text-blue-600">
          Author: John Wick
        </div>
      </div>
      <ReactQuill
        className="w-full h-[75%] bg-gray-100"
        value={content[currentStep - 1].content}
        onChange={(value: string) => {
          dispatch(
            updateContent({
              position: currentStep - 1,
              type: "content",
              data: value,
            })
          );
        }}
        placeholder="Write content..."
        modules={toolbarModules}
      />
      <div className="w-full h-[15%] flex items-center justify-between bg-gray-300 px-2 rounded-b-md">
        <div className="w-2/3 flex flex-col relative">
          <div className="font-semibold">Youtube URL</div>
          <input
            className="w-full font-medium text-sm pr-6 pl-2 py-1 rounded outline-none focus:bg-gray-50"
            value={content[currentStep - 1].url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                updateContent({
                  position: currentStep - 1,
                  type: "url",
                  data: e.target.value,
                })
              );
            }}
          />
          <img
            className="absolute w-4 h-4 bottom-1.5 right-1"
            src={link}
            alt=""
          />
        </div>
        <div className="w-fit flex items-center gap-4 mr-1">
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
          {currentStep === totalSteps && (
            <img
              onClick={() => {
                dispatch(addNewContent());
              }}
              className="cursor-pointer"
              src={add}
              alt="ADD"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorContent;
