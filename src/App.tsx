import { Routes, Route, useNavigate } from "react-router-dom";
import Author from "./components/Author/Author";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Student from "./components/Student/Student";
import Admin from "./components/Admin";
import { useAppSelector } from "./store/hooks";

function App() {
  const { user } = useAppSelector((state) => state);

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden relative">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Route path="/student" element={<Student />} />
              <Route path="/author" element={<Author />} />
              <Route path="/admin" element={<Admin />} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
