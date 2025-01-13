"use client";

import UpdateSupplierComponent from '@/components/suppliers/UpdateSupplierComponent'
import ProtectedRoute from '@/protected/protectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <UpdateSupplierComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page