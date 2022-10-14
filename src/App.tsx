import { Routes, Route, useNavigate } from "react-router-dom";
import Author from "./components/Author";
import Student from "./components/Student";

function App() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden relative">
      <Routes>
        <Route path="/" element={<Author />} />
        <Route path="/student" element={<Student />} />
      </Routes>

      <div className="absolute bottom-1 right-2 flex items-center gap-2">
        <button
          onClick={() => {
            navigate("/student");
          }}
          className="w-fit h-fit px-3 py-0.5 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-md"
        >
          Student
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-fit h-fit px-3 py-0.5 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-md"
        >
          Author
        </button>
      </div>
    </div>
  );
}

export default App;
