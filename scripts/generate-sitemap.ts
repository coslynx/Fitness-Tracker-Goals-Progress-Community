import { promises as fs } from 'fs';
import { join } from 'path';
import { SitemapStream, streamTostring } from 'sitemap';
import { IGoalRepository } from '../../core/domain/repositories/goals/IGoalRepository';
import { GoalType } from '../../../types/goal';
import { Goal } from '../../domain/entities/goal/Goal';
import { prisma } from '../../infrastructure/adapters/database/prisma/prisma';

const env = process.env.NODE_ENV || 'development';
const baseUrl = env === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_BASE_URL || 'https://www.your-fitness-tracker.com';

// Function to generate a sitemap for all Goals
export default async function generateSitemap(goalRepository: IGoalRepository) {
  try {
    const goals = await goalRepository.findAll();
    const smStream = new SitemapStream({ hostname: baseUrl });
    const urls = goals.map((goal: Goal) => ({
      url: `${baseUrl}/goals/${goal.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: goal.updatedAt || goal.createdAt,
    }));
    urls.forEach((url) => smStream.write(url));
    smStream.end();
    const sitemap = streamTostring(smStream);
    await fs.writeFile(join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// This is a helper function to fetch all Goals from the database
async function findAll() {
  try {
    const goals = await prisma.goal.findMany();
    return goals;
  } catch (error) {
    console.error('Error fetching all Goals:', error);
    throw error;
  }
}