'use client'

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/presentation/components/ui/Input';
import { Button } from '@/presentation/components/ui/Button';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { signup } from '@/lib/api/client';

interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [error, setError] = useState(null);

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
      await signup(formData);
      router.push('/auth/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (session) {
    return null; // Redirect if already logged in
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Sign Up</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Input
        type="text"
        id="username"
        name="username"
        label="Username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <Button type="submit" disabled={isLoading} fullWidth>
        {isLoading ? <Spinner size="sm" /> : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignupForm;