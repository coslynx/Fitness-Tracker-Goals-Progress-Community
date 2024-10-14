import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function up() {
  // Ensure the database is properly set up for the Fitness Tracker MVP
  await prisma.user.createMany({
    data: [
      // Add initial user data if needed for testing or MVP functionality
      {
        email: 'admin@example.com',
        password: 'password123',
      },
    ],
    skipDuplicates: true, // Prevent duplicate entries in the database
  });

  await prisma.goal.createMany({
    data: [
      // Add initial goal data if needed for testing or MVP functionality
      {
        userId: 'user1', // Assuming user1 is a valid user ID in the database
        type: 'weight_loss',
        targetValue: 10,
        deadline: new Date('2024-12-31'),
      },
    ],
    skipDuplicates: true, // Prevent duplicate entries in the database
  });
}

export async function down() {
  // Down migrations are typically used to rollback the changes made in the up migration.
  // For example, if the up migration created a new table, the down migration would drop that table.
  // In this case, the down migration will delete all users and goals created in the up migration.
  // Use caution when implementing down migrations, as they can potentially lead to data loss.
  await prisma.goal.deleteMany();
  await prisma.user.deleteMany();
}