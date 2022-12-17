import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bgmain from "./components/layout/Bgmain";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import NavbarMenu from "./components/layout/NavbarMenu";
import CourseContextProvider from "./contexts/CourseContext";
import SingleCourse from "./views/SingleCourse";
import Forum from "./views/Forum";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <CourseContextProvider>
       <PostContextProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Bgmain />} />
              <Route exact path="/login" element={<Auth authRoute="login" />} />
              <Route
                exact
                path="/register"
                element={<Auth authRoute="register" />}
              />
              <Route
                exact
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <NavbarMenu />
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/singlecourse"
                element={
                  <ProtectedRoute>
                    <NavbarMenu />
                   <SingleCourse/>
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/forum"
                element={
                  <ProtectedRoute>
                    <NavbarMenu />
                   <Forum/>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
       </PostContextProvider>
      </CourseContextProvider>
    </AuthContextProvider>
  );
}

export default App;
