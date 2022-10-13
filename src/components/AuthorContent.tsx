import React from "react";
import add from "../assets/images/add.svg";
import next from "../assets/images/next.svg";
import previous from "../assets/images/previous.svg";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AuthorContent = ({}: any) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState(EditorState.createEmpty());
  const [url, setURL] = React.useState("");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[10%] flex items-center bg-green-200 gap-2 px-2">
        <div>Title</div>
        <input
          className="w-2/3"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <Editor
        wrapperClassName="w-full h-[75%]"
        toolbarClassName="w-full h-1/4 m-0"
        editorClassName="w-full h-3/4 bg-gray-50 overflow-y-auto"
        editorState={content}
        onEditorStateChange={(editorState) => {
          setContent(editorState);
        }}
      />

      <div className="w-full h-[15%] flex items-center justify-between bg-blue-100 px-2">
        <div className="w-2/3 flex flex-col">
          <div>Youtube URL</div>
          <input
            className="w-full"
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setURL(e.target.value);
            }}
          />
        </div>
        <div className="w-fit flex items-center gap-3">
          <img src={previous} alt="PREVIOUS" />
          <img src={next} alt="NEXT" />
          <img src={add} alt="ADD" />
        </div>
      </div>
    </div>
  );
};

export default AuthorContent;
