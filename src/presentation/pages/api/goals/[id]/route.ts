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
        const goalId = req.query.id as string;
        const goal = await goalService.getGoalById(goalId);
        if (goal) {
          const responseGoal = goalMapper.toApiResponse(goal);
          res.status(200).json(responseGoal);
        } else {
          res.status(404).json({ error: 'Goal not found' });
        }
      } catch (error) {
        console.error('Error getting goal:', error);
        res.status(500).json({ error: 'Failed to retrieve goal' });
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