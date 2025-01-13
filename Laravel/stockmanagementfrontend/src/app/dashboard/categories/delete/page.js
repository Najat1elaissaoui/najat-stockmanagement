"use client";

import DeleteCategoryComponent from '@/components/categories/DeleteCategoryComponent'
import ProtectedRoute from '@/protected/protectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <DeleteCategoryComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page