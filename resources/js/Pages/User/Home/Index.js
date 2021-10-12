import React from 'react';
import UserLayout from '@/Components/UserLayout';

const Index = () => {
  return (
    <UserLayout>
      <div className="container max-w-screen-xl mx-auto">
        <div className="py-8 space-y-4">
          <div className="p-4 bg-gray-200 rounded-md">
            Welcome!
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Index;