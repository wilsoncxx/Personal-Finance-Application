import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import Expense from "./Expense";
import React from "react";
import Analytics from "./Analytics";
import SavingGoals from "./SavingGoals";
import Budget from "./Budget";

function App() {
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "1000px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Expense />
                  </PrivateRoute>
                }
              />

              <Route
                path="/expense"
                element={
                  <PrivateRoute>
                    <Expense />
                  </PrivateRoute>
                }
              />
              <Route
                path="/budget"
                element={
                  <PrivateRoute>
                    <Budget />
                  </PrivateRoute>
                }
              />

              <Route
                path="/analytics"
                element={
                  <PrivateRoute>
                    <Analytics />
                  </PrivateRoute>
                }
              />

              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/saving-goals"
                element={
                  <PrivateRoute>
                    <SavingGoals />
                  </PrivateRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
