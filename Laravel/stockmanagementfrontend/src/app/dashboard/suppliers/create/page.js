"use client";

import CreateSupplierComponent from '@/components/suppliers/CreateSupplierComponent'
import ProtectedRoute from '@/protected/protectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <CreateSupplierComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page