'use client'

import React, { useState } from 'react';
import { Goal } from '@/core/domain/entities/goal/Goal';
import { GoalType } from '@/types/goal';
import { Button } from '@/presentation/components/ui/Button';
import { formatDate } from '@/lib/utils/formatters';
import { useGoals } from '@/lib/hooks/useGoals';
import { useUser } from '@/lib/hooks/useUser';
import { updateGoal, deleteGoal } from '@/lib/api/client';
import { Modal } from '@/presentation/components/ui/Modal';
import { Spinner } from '@/presentation/components/ui/Spinner';
import { Select } from '@/presentation/components/ui/Select';
import { Input } from '@/presentation/components/ui/Input';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const { goals, isLoading, fetchGoals } = useGoals();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Goal>>({
    type: goal.type,
    targetValue: goal.targetValue,
    deadline: goal.deadline,
  });
  const [error, setError] = useState(null);

  const handleGoalDelete = async () => {
    try {
      await deleteGoal(goal.id);
      // Update the goals list
      await fetchGoals(user?.id as string);
    } catch (error: any) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleGoalEdit = () => {
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'deadline' ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoadingForm(true);
    setError(null);

    try {
      await updateGoal(goal.id, formData);
      // Update the goals list
      await fetchGoals(user?.id as string);
      setShowModal(false);
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{goal.type}</h2>
        <div className="flex space-x-2">
          <Button onClick={handleGoalEdit} variant="primary">
            Edit
          </Button>
          <Button onClick={handleGoalDelete} variant="danger">
            Delete
          </Button>
        </div>
      </div>
      <div className="mb-2">
        <p className="text-gray-700 text-sm font-medium">
          Target Value: {goal.targetValue}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700 text-sm font-medium">
          Deadline: {formatDate(goal.deadline)}
        </p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700 text-sm font-medium">
          Progress: {goal.progress}%
        </p>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal} title={isEditing ? 'Edit Goal' : 'New Goal'}>
        {isLoadingForm ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Select
              label="Goal Type"
              value={formData.type as GoalType}
              onChange={(value) => handleChange({ target: { name: 'type', value } })}
              options={[GoalType.weight_loss, GoalType.muscle_gain, GoalType.running_distance, GoalType.other]}
              error={error?.includes('type') ? 'Please select a goal type' : ''}
            />
            <Input
              type="number"
              id="targetValue"
              name="targetValue"
              label="Target Value"
              placeholder="Enter your target value"
              value={formData.targetValue || ''}
              onChange={handleChange}
              required
              error={error?.includes('targetValue') ? 'Please enter a valid target value' : ''}
            />
            <Input
              type="date"
              id="deadline"
              name="deadline"
              label="Deadline"
              value={formData.deadline ? formData.deadline.toISOString().slice(0, 10) : ''}
              onChange={handleChange}
              required
              error={error?.includes('deadline') ? 'Please select a valid deadline' : ''}
            />
            <Button type="submit" disabled={isLoadingForm} fullWidth>
              {isLoadingForm ? <Spinner size="sm" /> : isEditing ? 'Save Changes' : 'Create Goal'}
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default GoalCard;