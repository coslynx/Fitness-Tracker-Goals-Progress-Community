import { GoalType } from './goal';

export interface GenerationData {
  id: string;
  userId: string;
  goalType: GoalType;
  targetValue: number;
  deadline: Date;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerationRequest {
  goalId: string;
  generationType: string;
  parameters?: Record<string, any>;
}

export interface GenerationResponse {
  id: string;
  generationId: string;
  goalId: string;
  generationType: string;
  status: 'pending' | 'inProgress' | 'completed' | 'failed';
  results?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerationResult {
  id: string;
  generationId: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}