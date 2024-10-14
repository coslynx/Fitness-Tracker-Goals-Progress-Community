import { Goal } from '@/core/domain/entities/goal/Goal';
import { GoalType } from '@/types/goal';
import { ProgressEntry } from '@/core/domain/entities/progress/ProgressEntry';

/**
 * Formats a date object into a user-friendly string.
 * 
 * @param date - The date object to format.
 * @returns - A formatted date string in the format "MM/DD/YYYY".
 */
export const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

/**
 * Formats a number representing a progress percentage into a user-friendly string.
 * 
 * @param progress - The progress percentage to format.
 * @returns - A formatted progress string with a percentage symbol.
 */
export const formatProgressPercentage = (progress: number): string => {
  return `${progress}%`;
};

/**
 * Formats a Goal object into a user-friendly string.
 * 
 * @param goal - The Goal object to format.
 * @returns - A formatted goal string with a clear representation of goal type, target value, and deadline.
 */
export const formatGoal = (goal: Goal): string => {
  return `${goal.type} - Target: ${goal.targetValue} - Deadline: ${formatDate(goal.deadline)}`;
};

/**
 * Formats an array of ProgressEntry objects into a user-friendly string.
 * 
 * @param progressEntries - The ProgressEntry objects to format.
 * @returns - A formatted progress log string, showing each entry's date and value.
 */
export const formatProgressLog = (progressEntries: ProgressEntry[]): string => {
  if (progressEntries.length === 0) {
    return 'No progress entries yet.';
  }

  return progressEntries
    .map((entry) => `${formatDate(entry.date)} - ${entry.value}`)
    .join('\n');
};

/**
 * Formats a time difference into a user-friendly string.
 * 
 * @param timeDifference - The time difference in milliseconds.
 * @returns - A formatted time difference string in the format "X days, Y hours, Z minutes, W seconds".
 */
export const formatTimeDifference = (timeDifference: number): string => {
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  let formattedTime = '';

  if (days > 0) {
    formattedTime += `${days} days`;
  }

  if (hours > 0) {
    if (formattedTime !== '') {
      formattedTime += ', ';
    }
    formattedTime += `${hours} hours`;
  }

  if (minutes > 0) {
    if (formattedTime !== '') {
      formattedTime += ', ';
    }
    formattedTime += `${minutes} minutes`;
  }

  if (seconds > 0) {
    if (formattedTime !== '') {
      formattedTime += ', ';
    }
    formattedTime += `${seconds} seconds`;
  }

  return formattedTime;
};