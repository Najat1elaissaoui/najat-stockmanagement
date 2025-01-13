import ProfileComponent from '@/components/ProfileComponent'
import ProtectedRoute from '@/protected/protectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <ProfileComponent />
      </div>
    </ProtectedRoute>
  )
}

export default page