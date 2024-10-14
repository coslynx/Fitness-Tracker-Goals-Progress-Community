import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Goal } from '@/core/domain/entities/goal/Goal';
import { GoalType } from '@/types/goal';
import { fetchGoals } from '@/lib/api/client';

export const useGoals = () => {
  const store = useStore();
  const { goals: storedGoals, isLoading: storedIsLoading } = store;
  const [goals, setGoals] = useState<Goal[]>(storedGoals);
  const [isLoading, setIsLoading] = useState(storedIsLoading);

  useEffect(() => {
    const fetchAndStoreGoals = async () => {
      setIsLoading(true);
      try {
        const goalsData = await fetchGoals(store.user.id);
        setGoals(goalsData);
        store.setGoals(goalsData);
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (store.user.id) {
      fetchAndStoreGoals();
    }

    return () => {
      setGoals([]);
      store.setGoals([]);
    };
  }, [store.user.id]);

  const addGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
    store.addGoal(newGoal);
  };

  return {
    goals,
    isLoading,
    addGoal,
  };
};