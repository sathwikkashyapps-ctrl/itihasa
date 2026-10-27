import { Router, Request, Response } from 'express';
import { prisma } from '../db';

export const galleryRouter = Router();

// GET /api/gallery - aggregate images from sites with category, captions, and credits
galleryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const where: any = {};
    if (category && category !== 'all') {
      where.site = {
        category: String(category).toLowerCase()
      };
    }

    const images = await prisma.siteImage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: true,
            district: true,
            era: true
          }
        }
      }
    });

    return res.json(images);
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});
