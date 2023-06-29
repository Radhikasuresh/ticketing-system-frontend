import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
const SignIn = lazy(() => import("pages/SignIn"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const MyQueries = lazy(() => import("pages/MyQueries"));
const CreateQuery = lazy(() => import("pages/CreateQuery"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard title="My Queries">
                <MyQueries />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-query"
          element={
            <ProtectedRoute>
              <Dashboard title="Create Query">
                <CreateQuery />
              </Dashboard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
