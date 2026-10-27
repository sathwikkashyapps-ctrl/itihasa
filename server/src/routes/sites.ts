import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { authenticateAdmin } from '../middleware/auth';

export const sitesRouter = Router();

// GET /api/sites with query parameters
sitesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const {
      category,
      era,
      district,
      conservationStatus,
      isProtected,
      search,
      sort = 'name',
      order = 'asc',
      page = '1',
      limit = '12'
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const take = Math.min(50, Math.max(1, parseInt(limit as string) || 12));
    const skip = (pageNum - 1) * take;

    const where: any = {};

    if (category && category !== 'all') {
      where.category = String(category).toLowerCase();
    }
    if (era && era !== 'all') {
      where.era = String(era);
    }
    if (district && district !== 'all') {
      where.district = { contains: String(district) };
    }
    if (conservationStatus && conservationStatus !== 'all') {
      where.conservationStatus = String(conservationStatus);
    }
    if (isProtected !== undefined && isProtected !== 'all') {
      where.isProtected = isProtected === 'true';
    }
    if (search) {
      const q = String(search).trim();
      where.OR = [
        { name: { contains: q } },
        { shortDescription: { contains: q } },
        { district: { contains: q } },
        { architecture: { contains: q } }
      ];
    }

    let orderBy: any = { name: 'asc' };
    if (sort === 'views') {
      orderBy = { views: order === 'asc' ? 'asc' : 'desc' };
    } else if (sort === 'yearBuilt') {
      orderBy = { yearBuilt: order === 'asc' ? 'asc' : 'desc' };
    } else if (sort === 'createdAt') {
      orderBy = { createdAt: order === 'asc' ? 'asc' : 'desc' };
    } else if (sort === 'name') {
      orderBy = { name: order === 'desc' ? 'desc' : 'asc' };
    }

    const [sites, total] = await Promise.all([
      prisma.site.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          images: { take: 3 }
        }
      }),
      prisma.site.count({ where })
    ]);

    return res.json({
      data: sites,
      pagination: {
        total,
        page: pageNum,
        limit: take,
        totalPages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    console.error('Error fetching sites:', error);
    return res.status(500).json({ error: 'Failed to fetch heritage sites' });
  }
});

// GET /api/sites/filters - Get distinct filter values
sitesRouter.get('/meta/filters', async (_req: Request, res: Response) => {
  try {
    const [categories, eras, districts, conservationStatuses] = await Promise.all([
      prisma.site.findMany({ select: { category: true }, distinct: ['category'] }),
      prisma.site.findMany({ select: { era: true }, distinct: ['era'] }),
      prisma.site.findMany({ select: { district: true }, distinct: ['district'] }),
      prisma.site.findMany({ select: { conservationStatus: true }, distinct: ['conservationStatus'] })
    ]);

    return res.json({
      categories: categories.map(c => c.category),
      eras: eras.map(e => e.era),
      districts: districts.map(d => d.district),
      conservationStatuses: conservationStatuses.map(cs => cs.conservationStatus)
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch site filter metadata' });
  }
});

// GET /api/sites/:slug - Detailed site information
sitesRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const site = await prisma.site.findUnique({
      where: { slug },
      include: {
        images: true,
        events: {
          where: { endDate: { gte: new Date() } },
          take: 4
        }
      }
    });

    if (!site) {
      return res.status(404).json({ error: 'Heritage site not found' });
    }

    // Increment view count asynchronously
    await prisma.site.update({
      where: { id: site.id },
      data: { views: { increment: 1 } }
    }).catch(console.error);

    // Fetch related sites in the same category or era
    const relatedSites = await prisma.site.findMany({
      where: {
        id: { not: site.id },
        OR: [
          { category: site.category },
          { era: site.era },
          { district: site.district }
        ]
      },
      take: 4,
      include: { images: { take: 1 } }
    });

    return res.json({
      site,
      relatedSites
    });
  } catch (error) {
    console.error('Error fetching site detail:', error);
    return res.status(500).json({ error: 'Failed to fetch site details' });
  }
});

// Admin CRUD
const siteSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string(),
  shortDescription: z.string(),
  history: z.string(),
  significance: z.string(),
  architecture: z.string(),
  era: z.string(),
  yearBuilt: z.string(),
  district: z.string(),
  state: z.string().default('India'),
  latitude: z.number(),
  longitude: z.number(),
  conservationStatus: z.enum(['Excellent', 'Good', 'Needs Attention', 'Endangered']),
  isProtected: z.boolean().default(true),
  visitingHours: z.string(),
  entryFee: z.string(),
  bestSeason: z.string(),
  coverImage: z.string().url().or(z.string().startsWith('/uploads/')),
  images: z.array(z.object({
    url: z.string(),
    caption: z.string().optional(),
    credit: z.string().optional()
  })).optional()
});

sitesRouter.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const parseResult = siteSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Validation error', details: parseResult.error.format() });
    }

    const { images, ...data } = parseResult.data;
    const createdSite = await prisma.site.create({
      data: {
        ...data,
        images: images && images.length > 0 ? {
          create: images
        } : undefined
      },
      include: { images: true }
    });

    return res.status(201).json(createdSite);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A site with this slug already exists' });
    }
    return res.status(500).json({ error: 'Failed to create site' });
  }
});

sitesRouter.put('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parseResult = siteSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Validation error', details: parseResult.error.format() });
    }

    const { images, ...data } = parseResult.data;
    const updated = await prisma.site.update({
      where: { id },
      data
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update site' });
  }
});

sitesRouter.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.site.delete({ where: { id } });
    return res.json({ success: true, message: 'Site deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete site' });
  }
});
