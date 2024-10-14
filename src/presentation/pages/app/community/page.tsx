'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { CommunityFeed } from '@/presentation/components/features/community/CommunityFeed';
import { UserProfile } from '@/presentation/components/features/community/UserProfile';
import { fetchCommunityFeed, fetchUserProfile } from '@/lib/api/client';

const CommunityPage = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [feedData, setFeedData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCommunityFeed(session.user.id).then(data => {
        setFeedData(data);
      });
    }
  }, [session]);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  };

  if (!session) {
    return <p>Please log in to view the community.</p>;
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="hidden lg:block lg:w-64 lg:bg-gray-800 lg:flex-none">
          {/* Sidebar */}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-none bg-gray-800 py-3">
            {/* App Logo and Navigation */}
          </div>
          <div className="flex flex-1 flex-col overflow-auto">
            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-4 p-4 overflow-auto">
              <CommunityFeed feedData={feedData} onUserSelect={handleUserSelect} />
              {selectedUser && (
                <div className="p-4 rounded-md shadow-md bg-white">
                  <UserProfile userId={selectedUser} />
                </div>
              )}
            </div>
            <div className="flex-none bg-gray-800 py-3">
              {/* Footer */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommunityPage;