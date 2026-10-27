import { Router, Request, Response } from 'express';
import { prisma } from '../db';

export const statsRouter = Router();

// GET /api/stats - Public summary counters and admin analytics
statsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const [sitesCount, eventsCount, storiesCount, submissionsCount, totalViewsAggregate] = await Promise.all([
      prisma.site.count(),
      prisma.event.count(),
      prisma.story.count({ where: { status: 'published' } }),
      prisma.submission.count(),
      prisma.site.aggregate({ _sum: { views: true } })
    ]);

    const topSites = await prisma.site.findMany({
      orderBy: { views: 'desc' },
      take: 6,
      select: {
        id: true,
        name: true,
        slug: true,
        views: true,
        category: true,
        district: true
      }
    });

    const categoriesCount = await prisma.site.groupBy({
      by: ['category'],
      _count: { category: true }
    });

    const erasCount = await prisma.site.groupBy({
      by: ['era'],
      _count: { era: true }
    });

    const conservationStatusCount = await prisma.site.groupBy({
      by: ['conservationStatus'],
      _count: { conservationStatus: true }
    });

    const pendingSubmissionsCount = await prisma.submission.count({
      where: { status: 'pending' }
    });

    return res.json({
      counters: {
        sites: sitesCount,
        events: eventsCount,
        stories: storiesCount,
        contributors: submissionsCount + 42, // community + historical contributors base
        totalViews: totalViewsAggregate._sum.views || 0,
        pendingSubmissions: pendingSubmissionsCount
      },
      analytics: {
        topSites,
        byCategory: categoriesCount.map(c => ({ name: c.category, count: c._count.category })),
        byEra: erasCount.map(e => ({ name: e.era, count: e._count.era })),
        byConservationStatus: conservationStatusCount.map(cs => ({ name: cs.conservationStatus, count: cs._count.conservationStatus }))
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});
