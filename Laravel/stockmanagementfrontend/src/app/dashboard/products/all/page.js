"use client";

import GetProductsComponent from '@/components/products/all/GetProductsComponent'
import ProtectedRoute from '@/protected/protectedRoute';
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <GetProductsComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page