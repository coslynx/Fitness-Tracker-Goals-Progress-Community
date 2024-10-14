import { GoalType } from './goal';

export interface User {
  id: string;
  email: string;
  password?: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  goals?: Goal[];
}

export interface UserSession {
  id: string;
  email: string;
  username: string;
}