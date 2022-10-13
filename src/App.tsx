import { Routes, Route } from "react-router-dom";
import Author from "./components/Author";
import Student from "./components/Student";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Author />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </div>
  );
}

export default App;
