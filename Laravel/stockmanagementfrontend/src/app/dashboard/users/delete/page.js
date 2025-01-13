"use client";

import DeleteUserComponent from '@/components/users/delete/DeleteUserComponent'
import ProtectedRoute from '@/protected/protectedRoute';
import React from 'react'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <DeleteUserComponent />
      </ProtectedRoute>
    </div>
  )
}

export default page