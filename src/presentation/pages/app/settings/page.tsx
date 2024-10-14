'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { fetchUser, updateUser } from '@/lib/api/client';
import { User } from '@/core/domain/entities/user/User';
import { Input } from '@/presentation/components/ui/Input';
import { Button } from '@/presentation/components/ui/Button';
import { Spinner } from '@/presentation/components/ui/Spinner';

const SettingsPage = () => {
  const { data: session } = useSession();
  const store = useStore();
  const { user, setUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setIsLoading(true);
      fetchUser(session.user.id)
        .then(userData => {
          setUserData(userData);
          setUser(userData);
          store.setUser(userData);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    if (!userData) {
      return;
    }
    setIsUpdating(true);
    try {
      await updateUser(userData);
      setUser(userData);
      store.setUser(userData);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
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
            <div className="p-4 rounded-md shadow-md bg-white">
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <form onSubmit={handleUpdateUser}>
                {userData && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                      </label>
                      <Input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* Add more settings options based on user data */}
                  </>
                )}
                <div className="flex items-center justify-center">
                  {isUpdating ? (
                    <Button disabled={true}>Updating...</Button>
                  ) : (
                    <Button type="submit">Save Changes</Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;