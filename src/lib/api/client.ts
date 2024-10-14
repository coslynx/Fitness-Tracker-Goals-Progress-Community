import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Goal } from '@/core/domain/entities/goal/Goal';
import { GoalType } from '@/types/goal';
import { ProgressEntry } from '@/core/domain/entities/progress/ProgressEntry';
import { User } from '@/core/domain/entities/user/User';
import { CommunityFeedItem } from '@/core/domain/entities/community/CommunityFeedItem';
import { getAuthToken } from '@/lib/utils/auth';

// - API Endpoint URLs:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// -  API Client:
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`, //  Automatically includes auth token
  },
});

// - API Request Interceptors:
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //  Add any custom logic for before request is sent
    //  (e.g., adding additional headers, handling token refresh)
    return config;
  },
  (error) => {
    //  Handle request errors 
    return Promise.reject(error);
  }
);

// - API Response Interceptors:
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    //  Add any custom logic for after response is received
    //  (e.g., handling success responses, extracting data)
    return response;
  },
  (error) => {
    //  Handle response errors
    //  Log error details
    //  Implement custom error handling logic
    return Promise.reject(error);
  }
);

// -  API Request Functions:
export async function createGoal(goalData: {
  type: GoalType;
  targetValue: number;
  deadline: Date;
  userId: string;
}): Promise<Goal> {
  try {
    const response = await apiClient.post('/goals', goalData);
    return response.data as Goal;
  } catch (error: any) {
    console.error('Error creating goal:', error);
    throw error;
  }
}

export async function getGoals(userId: string): Promise<Goal[]> {
  try {
    const response = await apiClient.get(`/goals?userId=${userId}`);
    return response.data as Goal[];
  } catch (error: any) {
    console.error('Error getting goals:', error);
    throw error;
  }
}

export async function updateGoal(goalId: string, goalData: Partial<Goal>): Promise<void> {
  try {
    await apiClient.put(`/goals/${goalId}`, goalData);
  } catch (error: any) {
    console.error('Error updating goal:', error);
    throw error;
  }
}

export async function deleteGoal(goalId: string): Promise<void> {
  try {
    await apiClient.delete(`/goals/${goalId}`);
  } catch (error: any) {
    console.error('Error deleting goal:', error);
    throw error;
  }
}

export async function logProgress(progressData: {
  goalId: string;
  value: number;
  date: Date;
}): Promise<void> {
  try {
    await apiClient.post('/progress', progressData);
  } catch (error: any) {
    console.error('Error logging progress:', error);
    throw error;
  }
}

export async function fetchProgressData(userId: string): Promise<ProgressEntry[]> {
  try {
    const response = await apiClient.get(`/progress?userId=${userId}`);
    return response.data as ProgressEntry[];
  } catch (error: any) {
    console.error('Error fetching progress data:', error);
    throw error;
  }
}

export async function fetchCommunityFeed(userId: string): Promise<CommunityFeedItem[]> {
  try {
    const response = await apiClient.get(`/community?userId=${userId}`);
    return response.data as CommunityFeedItem[];
  } catch (error: any) {
    console.error('Error fetching community feed:', error);
    throw error;
  }
}

export async function fetchUserProfile(userId: string): Promise<User> {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data as User;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function signup(userData: {
  email: string;
  password: string;
  username: string;
}): Promise<void> {
  try {
    await apiClient.post('/auth/register', userData);
  } catch (error: any) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function fetchUser(userId: string): Promise<User> {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data as User;
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function updateUser(userData: User): Promise<void> {
  try {
    await apiClient.put(`/users/${userData.id}`, userData);
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function updateFeedItem(feedItemId: string, feedItemData: Partial<CommunityFeedItem>): Promise<void> {
  try {
    await apiClient.put(`/community/${feedItemId}`, feedItemData);
  } catch (error: any) {
    console.error('Error updating community feed item:', error);
    throw error;
  }
}

export async function createFeedItem(feedItemData: Partial<CommunityFeedItem>): Promise<void> {
  try {
    await apiClient.post('/community', feedItemData);
  } catch (error: any) {
    console.error('Error creating community feed item:', error);
    throw error;
  }
}