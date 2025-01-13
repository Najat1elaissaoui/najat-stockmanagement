"use client";

import DeleteProductsComponent from '@/components/products/delete/DeleteProductComponent'
import ProtectedRoute from '@/protected/protectedRoute';
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <DeleteProductsComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page