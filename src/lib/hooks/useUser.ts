import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { User } from '@/core/domain/entities/user/User';
import { fetchUser } from '@/lib/api/client';

// This hook provides access to the current user data in the application.
// It fetches the user data from the API and stores it in the Zustand store.
// It also handles updating the user data in the store when changes occur.
export const useUser = () => {
  const { data: session } = useSession();
  const store = useStore();
  const [user, setUser] = useState<User | null>(store.user); // Initialize with user from store
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch user data from the API and update the store when session changes
    const fetchAndStoreUser = async () => {
      setIsLoading(true);
      try {
        if (session?.user?.id) {
          const userData = await fetchUser(session.user.id);
          setUser(userData);
          store.setUser(userData); // Update the Zustand store
        } else {
          setUser(null);
          store.setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchAndStoreUser();
    }

    // Cleanup: Reset user data when session changes
    return () => {
      setUser(null);
      store.setUser(null);
    };
  }, [session, store]); // Re-fetch when session or store changes

  return { user, setUser, isLoading };
};