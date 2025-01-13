"use client";

import CreateProductComponent from '@/components/products/create/CreateProductComponent';
import ProtectedRoute from '@/protected/protectedRoute';
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <CreateProductComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page