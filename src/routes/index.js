import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const SignIn = lazy(() => import("pages/SignIn"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
