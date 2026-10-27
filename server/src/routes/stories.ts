import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { authenticateAdmin } from '../middleware/auth';

export const storiesRouter = Router();

// GET /api/stories
storiesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { tag, status = 'published' } = req.query;
    const where: any = {};

    if (status !== 'all') {
      where.status = String(status);
    }
    if (tag) {
      where.tags = { contains: String(tag) };
    }

    const stories = await prisma.story.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return res.json(stories);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// GET /api/stories/:slug
storiesRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const story = await prisma.story.findUnique({
      where: { slug }
    });

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Get related stories
    const related = await prisma.story.findMany({
      where: {
        id: { not: story.id },
        status: 'published'
      },
      take: 3
    });

    return res.json({ story, related });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// Admin endpoints
const storySchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  body: z.string().min(10),
  authorName: z.string().min(2),
  coverImage: z.string(),
  audioUrl: z.string().optional().nullable(),
  tags: z.string(),
  readTime: z.string().default('5 min read'),
  status: z.enum(['published', 'draft']).default('published')
});

storiesRouter.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = storySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation error', details: parsed.error.format() });
    }

    const newStory = await prisma.story.create({ data: parsed.data });
    return res.status(201).json(newStory);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create story' });
  }
});

storiesRouter.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.story.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete story' });
  }
});
