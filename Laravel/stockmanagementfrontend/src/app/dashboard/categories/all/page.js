"use client";

import GetCategoriesComponent from '@/components/categories/GetCategoriesComponent'
import ProtectedRoute from '@/protected/protectedRoute';
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
        <div>
            <GetCategoriesComponent />
        </div>
    </ProtectedRoute>
  )
}

export default page