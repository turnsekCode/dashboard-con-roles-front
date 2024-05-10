import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectsPage from "./pages/ProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto px-10">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} role="superadmin" />
            <Route
              path="/create-project"
              element={<CreateProjectPage />}
              role="superadmin"
            />
            <Route path="/projects" element={<ProjectsPage />} role="guest" />
          </Route>
          <Route path="*" element={<LoginPage />} /> {/* Catch-all route */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
