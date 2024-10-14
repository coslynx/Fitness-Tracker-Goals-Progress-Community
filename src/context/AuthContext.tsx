'use client'

import { createContext, useState, useContext, useEffect } from 'react';
import { User, UserSession } from '@/types/user';
import { getSession, Session, useSession } from 'next-auth/react';
import { fetchUser } from '@/lib/api/client';
import { useStore } from '@/lib/store';

// Define the interface for the AuthContext
interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  isLoading: true,
  setUser: () => {},
  setSession: () => {},
});

// Define the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize the user and session state
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use the useSession hook to get the current session
  const { data: sessionData } = useSession();

  // Access the Zustand store
  const store = useStore();

  // Fetch user data when the session changes
  useEffect(() => {
    const fetchAndStoreUser = async () => {
      setIsLoading(true);
      try {
        if (sessionData?.user?.id) {
          const userData = await fetchUser(sessionData.user.id);
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

    // Call the fetchAndStoreUser function when the session changes
    if (sessionData) {
      fetchAndStoreUser();
    }

    // Cleanup: Reset user data when the session changes
    return () => {
      setUser(null);
      store.setUser(null);
    };
  }, [sessionData, store]); // Re-fetch when session or store changes

  // Update the session state when the session data changes
  useEffect(() => {
    setSession(sessionData);
  }, [sessionData]);

  // Return the AuthProvider component
  return (
    <AuthContext.Provider value={{ user, session, isLoading, setUser, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define a hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;