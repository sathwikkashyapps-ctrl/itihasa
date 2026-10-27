import { Router, Request, Response } from 'express';
import { prisma } from '../db';

export const searchRouter = Router();

// GET /api/search?q=...
searchRouter.get('/', async (req: Request, res: Response) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q || q.length < 2) {
      return res.json({ sites: [], events: [], stories: [] });
    }

    const [sites, events, stories] = await Promise.all([
      prisma.site.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { district: { contains: q } },
            { category: { contains: q } },
            { shortDescription: { contains: q } },
            { architecture: { contains: q } }
          ]
        },
        take: 6,
        select: {
          id: true,
          slug: true,
          name: true,
          category: true,
          district: true,
          coverImage: true,
          era: true
        }
      }),
      prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
            { type: { contains: q } }
          ]
        },
        take: 4,
        select: {
          id: true,
          slug: true,
          title: true,
          type: true,
          startDate: true,
          coverImage: true
        }
      }),
      prisma.story.findMany({
        where: {
          status: 'published',
          OR: [
            { title: { contains: q } },
            { tags: { contains: q } },
            { authorName: { contains: q } }
          ]
        },
        take: 4,
        select: {
          id: true,
          slug: true,
          title: true,
          authorName: true,
          coverImage: true,
          readTime: true
        }
      })
    ]);

    return res.json({ sites, events, stories });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Search failed' });
  }
});
