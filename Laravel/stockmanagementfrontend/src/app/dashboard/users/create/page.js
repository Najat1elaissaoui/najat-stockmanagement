import CreateUserComponent from '@/components/users/CreateUserComponent';
import ProtectedRoute from '@/protected/protectedRoute';
import React from 'react';

const Page = () => {
  return (
    <ProtectedRoute>
      <CreateUserComponent />
    </ProtectedRoute>
  );
};

export default Page;
