import { Goal } from '@/core/domain/entities/goal/Goal';

export interface ProgressEntry {
  id: string;
  goalId: string;
  value: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressChartProps {
  goal: Goal;
  progressData: ProgressEntry[];
}

export interface ProgressLogProps {
  goal: Goal;
  progressData: ProgressEntry[];
}