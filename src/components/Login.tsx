import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { updateUserDetails } from "../store/reducer/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="w-full h-full">
      <div className="absolute bottom-1 right-2 flex items-center gap-2">
        <button
          onClick={() => {
            navigate("/student");
            dispatch(updateUserDetails({ fullname: "aa", role: "student" }));
          }}
          className="w-fit h-fit px-3 py-0.5 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-md"
        >
          Student
        </button>
        <button
          onClick={() => {
            navigate("/author");
            dispatch(updateUserDetails({ fullname: "bb", role: "author" }));
          }}
          className="w-fit h-fit px-3 py-0.5 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-md"
        >
          Author
        </button>
        <button
          onClick={() => {
            navigate("/admin");
            dispatch(updateUserDetails({ fullname: "cc", role: "admin" }));
          }}
          className="w-fit h-fit px-3 py-0.5 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-md"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Login;
