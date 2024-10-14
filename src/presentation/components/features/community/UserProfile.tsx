'use client'

import React, { useState, useEffect } from 'react';
import { UserProfileProps } from '@/types/community';
import { fetchUserProfile } from '@/lib/api/client';
import { User } from '@/core/domain/entities/user/User';
import { Button } from '@/presentation/components/ui/Button';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { Card } from '@/presentation/components/ui/Card';
import { Input } from '@/presentation/components/ui/Input';
import { Select } from '@/presentation/components/ui/Select';
import { Modal } from '@/presentation/components/ui/Modal';

// Import any other necessary UI components or utility functions.

interface UserProfileState {
  user: User | null;
  isLoading: boolean;
  showModal: boolean;
  isEditing: boolean;
  isLoadingForm: boolean;
  formData: Partial<User>;
  error: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [state, setState] = useState<UserProfileState>({
    user: null,
    isLoading: true,
    showModal: false,
    isEditing: false,
    isLoadingForm: false,
    formData: {},
    error: null,
  });

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId)
        .then((user) => {
          setState((prevState) => ({ ...prevState, user, isLoading: false }));
        })
        .catch((error) => {
          setState((prevState) => ({ ...prevState, error, isLoading: false }));
        });
    }
  }, [userId]);

  // Function to handle editing the user profile
  const handleEditProfile = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: true,
      isEditing: true,
      formData: { ...prevState.user },
    }));
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: false,
      isEditing: false,
    }));
  };

  // Function to handle input changes in the form
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, isLoadingForm: true }));

    try {
      // Implement logic to update the user profile using the formData
      // Example: 
      await updateUserProfile(state.user!.id, state.formData); // Replace with actual updateUserProfile function

      // Refresh the user data
      await fetchUserProfile(userId).then((user) => {
        setState((prevState) => ({ ...prevState, user, isLoadingForm: false, showModal: false }));
      });
    } catch (error: any) {
      setState((prevState) => ({ ...prevState, error, isLoadingForm: false }));
    }
  };

  return (
    <Card className=''>
      {state.isLoading ? (
        <Spinner />
      ) : state.error ? (
        <p className='text-red-500 text-sm'>{state.error}</p>
      ) : state.user ? (
        <>
          <h2 className='text-xl font-bold mb-4'>{state.user.username}</h2>
          <div className='mb-4'>
            <p className='text-gray-700 text-sm'>Email: {state.user.email}</p>
          </div>
          <div className='mb-4'>
            {/* Display other user profile details here. */}
          </div>
          <Button onClick={handleEditProfile} variant='primary'>
            Edit Profile
          </Button>
          <Modal
            isOpen={state.showModal}
            onClose={handleCloseModal}
            title={state.isEditing ? 'Edit Profile' : 'New Profile'}
            isLoading={state.isLoadingForm}
          >
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <Input
                type='text'
                id='username'
                name='username'
                label='Username'
                placeholder='Enter your username'
                value={state.formData.username || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                type='email'
                id='email'
                name='email'
                label='Email'
                placeholder='Enter your email'
                value={state.formData.email || ''}
                onChange={handleInputChange}
                required
              />
              {/* Add more input fields for other profile details. */}

              <Button type='submit' disabled={state.isLoadingForm} fullWidth>
                {state.isLoadingForm ? (
                  <Spinner size='sm' />
                ) : state.isEditing ? (
                  'Save Changes'
                ) : (
                  'Create Profile'
                )}
              </Button>
            </form>
          </Modal>
        </>
      ) : null}
    </Card>
  );
};

export default UserProfile;