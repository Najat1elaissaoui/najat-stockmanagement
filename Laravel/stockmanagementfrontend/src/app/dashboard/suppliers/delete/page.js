"use client";

import DeleteSupplierComponent from '@/components/suppliers/DeleteSupplierComponent'
import ProtectedRoute from '@/protected/protectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <DeleteSupplierComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page