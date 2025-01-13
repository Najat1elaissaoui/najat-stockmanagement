"use client";

import GetSupplierComponent from '@/components/suppliers/GetSupplierComponent'
import ProtectedRoute from '@/protected/protectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <GetSupplierComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page