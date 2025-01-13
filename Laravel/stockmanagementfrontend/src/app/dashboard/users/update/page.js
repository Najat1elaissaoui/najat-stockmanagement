"use client";

import UpdateUserComponent from "@/components/users/update/UpdateUserComponent";
import ProtectedRoute from "@/protected/protectedRoute";
import React from "react";

const Page = () => {
  return (
    <>
    <ProtectedRoute>
      <UpdateUserComponent />
    </ProtectedRoute>
    </>
  );
};

export default Page;
