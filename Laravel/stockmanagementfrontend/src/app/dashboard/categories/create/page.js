"use client";

import CategoryComponent from '@/components/categories/CategoryComponent'
import ProtectedRoute from '@/protected/protectedRoute';
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
          <CategoryComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page