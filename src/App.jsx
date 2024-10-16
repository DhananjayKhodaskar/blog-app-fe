import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import CreatePost from "./components/Blog/CreatePost.jsx";
import EditPost from "./components/Blog/EditPost.jsx";
import SinglePost from "./pages/SinglePost.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={<ProtectedRoute component={CreatePost} />}
          />
          <Route
            path="/edit/:id"
            element={<ProtectedRoute component={EditPost} />}
          />
          <Route path="/posts/:id" element={<SinglePost />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
