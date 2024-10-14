'use client'

import React, { useState, useEffect } from 'react';
import { CommunityFeedProps } from '@/types/community';
import { fetchCommunityFeed } from '@/lib/api/client';
import { FeedItem } from '@/core/domain/entities/community/FeedItem';
import { formatDate } from '@/lib/utils/formatters';
import { Button } from '@/presentation/components/ui/Button';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { Card } from '@/presentation/components/ui/Card';
import { Input } from '@/presentation/components/ui/Input';
import { Select } from '@/presentation/components/ui/Select';
import { Modal } from '@/presentation/components/ui/Modal';
import { useSession } from 'next-auth/react';

interface CommunityFeedState {
  feedData: FeedItem[];
  isLoading: boolean;
  showModal: boolean;
  isEditing: boolean;
  isLoadingForm: boolean;
  formData: Partial<FeedItem>;
  error: string | null;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ onUserSelect }) => {
  const { data: session } = useSession();
  const [state, setState] = useState<CommunityFeedState>({
    feedData: [],
    isLoading: true,
    showModal: false,
    isEditing: false,
    isLoadingForm: false,
    formData: {},
    error: null,
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchCommunityFeed(session.user.id)
        .then((feedData) => {
          setState((prevState) => ({ ...prevState, feedData, isLoading: false }));
        })
        .catch((error) => {
          setState((prevState) => ({ ...prevState, error, isLoading: false }));
        });
    }
  }, [session]);

  const handleCreateFeedItem = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: true,
      isEditing: false,
      formData: {},
    }));
  };

  const handleEditFeedItem = (feedItem: FeedItem) => {
    setState((prevState) => ({
      ...prevState,
      showModal: true,
      isEditing: true,
      formData: { ...feedItem },
    }));
  };

  const handleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: false,
      isEditing: false,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, isLoadingForm: true }));

    try {
      if (state.isEditing) {
        await updateFeedItem(state.formData.id as string, state.formData);
      } else {
        await createFeedItem(state.formData);
      }

      await fetchCommunityFeed(session.user.id).then((feedData) => {
        setState((prevState) => ({ ...prevState, feedData, isLoadingForm: false, showModal: false }));
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
      ) : (
        <>
          <h2 className='text-xl font-bold mb-4'>Community Feed</h2>
          <Button onClick={handleCreateFeedItem} variant='primary'>
            New Post
          </Button>
          <ul className='space-y-3'>
            {state.feedData.length > 0 ? (
              state.feedData.map((feedItem) => (
                <li key={feedItem.id} className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <img
                      src={feedItem.user.avatar}
                      alt='User Avatar'
                      className='w-8 h-8 rounded-full'
                    />
                    <h3
                      className='ml-2 text-gray-700 text-sm font-bold'
                      onClick={() => onUserSelect(feedItem.user.id)}
                    >
                      {feedItem.user.username}
                    </h3>
                  </div>
                  <div className='flex items-center'>
                    <p className='text-gray-500 text-sm'>
                      {formatDate(feedItem.date)}
                    </p>
                    <Button
                      variant='tertiary'
                      onClick={() => handleEditFeedItem(feedItem)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant='danger'
                      onClick={() => {
                        // Implement logic to delete feedItem
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))
            ) : (
              <li className='text-gray-500 text-sm'>No posts yet.</li>
            )}
          </ul>
          <Modal
            isOpen={state.showModal}
            onClose={handleCloseModal}
            title={state.isEditing ? 'Edit Post' : 'New Post'}
            isLoading={state.isLoadingForm}
          >
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <Input
                type='text'
                id='content'
                name='content'
                label='Content'
                placeholder='Enter your post'
                value={state.formData.content || ''}
                onChange={handleInputChange}
                required
              />
              {/* Add more input fields for other feed item details. */}

              <Button type='submit' disabled={state.isLoadingForm} fullWidth>
                {state.isLoadingForm ? (
                  <Spinner size='sm' />
                ) : state.isEditing ? (
                  'Save Changes'
                ) : (
                  'Create Post'
                )}
              </Button>
            </form>
          </Modal>
        </>
      )}
    </Card>
  );
};

export default CommunityFeed;