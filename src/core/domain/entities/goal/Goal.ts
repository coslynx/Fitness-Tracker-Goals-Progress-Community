import { GoalType } from '../../../../types/goal';

export interface Goal {
  id: string;
  userId: string;
  type: GoalType;
  targetValue: number;
  deadline: Date;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}