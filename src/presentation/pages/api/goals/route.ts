import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { GoalService } from '../../../../core/application/services/goalService';
import { GoalMapper } from '../../../../infrastructure/gateways/api/GoalMapper';
import { prisma } from '../../../../infrastructure/adapters/database/prisma/prisma';
import { Goal } from '../../../../core/domain/entities/goal/Goal';
import { GoalType } from '../../../../types/goal';

const goalService = new GoalService();
const goalMapper = new GoalMapper();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;

  switch (req.method) {
    case 'GET':
      try {
        const goals = await goalService.getGoals(userId);
        const responseGoals = goals.map((goal) => goalMapper.toApiResponse(goal));
        res.status(200).json(responseGoals);
      } catch (error) {
        console.error('Error getting goals:', error);
        res.status(500).json({ error: 'Failed to retrieve goals' });
      }
      break;
    case 'POST':
      try {
        const goalData: { type: GoalType; targetValue: number; deadline: Date } = req.body;
        const goal: Goal = goalMapper.toDomainObject({ ...goalData, userId });
        const createdGoal = await goalService.createGoal(goal);
        const responseGoal = goalMapper.toApiResponse(createdGoal);
        res.status(201).json(responseGoal);
      } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ error: 'Failed to create goal' });
      }
      break;
    case 'PUT':
      try {
        const goalId = req.query.id as string;
        const goalData: Partial<Goal> = req.body;
        await goalService.updateGoal(goalId, goalData);
        res.status(204).send();
      } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ error: 'Failed to update goal' });
      }
      break;
    case 'DELETE':
      try {
        const goalId = req.query.id as string;
        await goalService.deleteGoal(goalId);
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ error: 'Failed to delete goal' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}