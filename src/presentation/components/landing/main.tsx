'use client'

import React from 'react';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { Link } from 'next/link';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Spinner } from '@/presentation/components/ui/Spinner';

interface LandingPageProps {
  // Any additional props specific to the LandingPage component can be added here.
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (session) {
    // Redirect if already logged in, e.g., to /dashboard
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-md shadow-md p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Fitness Tracker</h1>
          <p className="text-gray-500 mb-6">
            Track your fitness journey, set goals, and stay motivated.
          </p>
          <Button
            onClick={() => {
              // Navigate to signup page
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </Button>
          <Link
            href="/auth/login"
            className="ml-4 text-blue-500 hover:text-blue-700"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;