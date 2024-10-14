'use client'

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import { useUser } from '@/lib/hooks/useUser';
import Logo from '../logo';
import NewButton from '../new';

interface HeaderProps {
  // Any additional props specific to the Header component can be added here
}

const Header: React.FC<HeaderProps> = () => {
  // Get the current user from the session and the store
  const { data: session } = useSession();
  const { user } = useUser();

  return (
    <header className="bg-gray-800 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* App Logo */}
        <Link href="/" className="flex items-center">
          <Logo />
          <h1 className="text-white text-xl font-bold ml-2">Fitness Tracker</h1>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex space-x-4">
          {session && (
            <>
              <Link href="/dashboard" className="text-white hover:text-gray-200">
                Dashboard
              </Link>
              <Link href="/goals" className="text-white hover:text-gray-200">
                Goals
              </Link>
              <Link href="/progress" className="text-white hover:text-gray-200">
                Progress
              </Link>
              <Link href="/community" className="text-white hover:text-gray-200">
                Community
              </Link>
              <Link href="/settings" className="text-white hover:text-gray-200">
                Settings
              </Link>
            </>
          )}
          {!session && (
            <>
              <Link href="/auth/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link href="/auth/signup" className="text-white hover:text-gray-200">
                Signup
              </Link>
            </>
          )}
          {/* New Goal Button (only if user is logged in) */}
          {session && <NewButton />}
        </nav>
      </div>
    </header>
  );
};

export default Header;