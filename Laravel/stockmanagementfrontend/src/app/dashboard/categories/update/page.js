"use client";

import UpdateCategoryComponent from '@/components/categories/UpdateCategoryComponent'
import ProtectedRoute from '@/protected/protectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <UpdateCategoryComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page