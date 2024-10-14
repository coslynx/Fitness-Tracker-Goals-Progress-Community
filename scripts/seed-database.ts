import { PrismaClient } from '@prisma/client';
import { GoalType } from '../../../types/goal';
import { Goal } from '../../domain/entities/goal/Goal';
import prisma from '../../infrastructure/adapters/database/prisma/prisma';

// Define the initial goals to be seeded into the database
const initialGoals: Goal[] = [
  {
    id: 'goal-1',
    userId: 'user-1', // Assuming user-1 exists in the database
    type: GoalType.weight_loss,
    targetValue: 10,
    deadline: new Date('2024-12-31'),
    progress: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more initial goals as needed...
];

// Define the seedDatabase function to populate the database with initial goals
async function seedDatabase() {
  try {
    // Clear existing goals before seeding new data
    await prisma.goal.deleteMany();

    // Seed initial goals into the database
    await prisma.goal.createMany({
      data: initialGoals,
      skipDuplicates: true, // Prevent duplicate entries
    });

    console.log('Database seeded with initial goals.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Execute the seedDatabase function
seedDatabase();