import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
const SignIn = lazy(() => import("pages/SignIn"));
const MainLayout = lazy(() => import("Layouts/MainLayout"));
const MyQueries = lazy(() => import("pages/MyQueries"));
const CreateQuery = lazy(() => import("pages/CreateQuery"));
const AuthLayout = lazy(() => import("Layouts/AuthLayout"));
const ForgotPassword = lazy(() => import("pages/ForgotPassword"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout title="My Queries">
                <MyQueries />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-query"
          element={
            <ProtectedRoute>
              <MainLayout title="Create Query">
                <CreateQuery />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
