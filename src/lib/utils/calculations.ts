import { Goal } from '@/core/domain/entities/goal/Goal';
import { ProgressEntry } from '@/core/domain/entities/progress/ProgressEntry';
import { GoalType } from '@/types/goal';

// Calculate the percentage of progress made towards a goal.
export const calculateProgressPercentage = (goal: Goal, progressEntries: ProgressEntry[]): number => {
  // Ensure progressEntries is not undefined or empty.
  if (!progressEntries || progressEntries.length === 0) {
    return 0;
  }

  // Filter progress entries for the current goal.
  const goalProgress = progressEntries.filter((entry) => entry.goalId === goal.id);

  // Calculate the total progress made towards the goal.
  const totalProgress = goalProgress.reduce((acc, entry) => acc + entry.value, 0);

  // Ensure the total progress doesn't exceed the target value.
  const cappedProgress = Math.min(totalProgress, goal.targetValue);

  // Calculate the progress percentage.
  const progressPercentage = (cappedProgress / goal.targetValue) * 100;

  return progressPercentage;
};

// Calculate the remaining time until the goal deadline.
export const calculateRemainingTime = (goal: Goal): { days: number; hours: number; minutes: number; seconds: number } => {
  // Get the current timestamp.
  const now = new Date();

  // Calculate the difference between the deadline and now.
  const timeDifference = goal.deadline.getTime() - now.getTime();

  // Calculate the remaining time in days, hours, minutes, and seconds.
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

// Calculate the average progress per day towards a goal.
export const calculateAverageProgressPerDay = (goal: Goal, progressEntries: ProgressEntry[]): number => {
  // Ensure progressEntries is not undefined or empty.
  if (!progressEntries || progressEntries.length === 0) {
    return 0;
  }

  // Filter progress entries for the current goal.
  const goalProgress = progressEntries.filter((entry) => entry.goalId === goal.id);

  // Sort progress entries by date in ascending order.
  goalProgress.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate the total progress made towards the goal.
  const totalProgress = goalProgress.reduce((acc, entry) => acc + entry.value, 0);

  // Get the first and last dates from the progress entries.
  const firstDate = new Date(goalProgress[0].date);
  const lastDate = new Date(goalProgress[goalProgress.length - 1].date);

  // Calculate the number of days between the first and last dates.
  const daysDifference = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);

  // Ensure the number of days is at least one day.
  const days = Math.max(1, daysDifference);

  // Calculate the average progress per day.
  const averageProgressPerDay = totalProgress / days;

  return averageProgressPerDay;
};