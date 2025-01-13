"use client";


import UpdateProductComponent from '@/components/products/update/UpdateProductComponent'
import ProtectedRoute from '@/protected/protectedRoute';
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <UpdateProductComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page