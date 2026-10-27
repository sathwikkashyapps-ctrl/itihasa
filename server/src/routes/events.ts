import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { authenticateAdmin } from '../middleware/auth';
import { generateICS } from '../utils/ics';

export const eventsRouter = Router();

// GET /api/events with filters (month, type, location/site)
eventsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { type, month, year, siteId, upcomingOnly } = req.query;

    const where: any = {};
    if (type && type !== 'all') {
      where.type = String(type);
    }
    if (siteId) {
      where.siteId = String(siteId);
    }
    if (upcomingOnly === 'true') {
      where.endDate = { gte: new Date() };
    }
    if (month && year) {
      const m = parseInt(month as string) - 1; // 0-indexed
      const y = parseInt(year as string);
      const startOfMonth = new Date(Date.UTC(y, m, 1));
      const endOfMonth = new Date(Date.UTC(y, m + 1, 0, 23, 59, 59));
      where.startDate = { lte: endOfMonth };
      where.endDate = { gte: startOfMonth };
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startDate: 'asc' },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true,
            district: true,
            coverImage: true
          }
        }
      }
    });

    return res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:slug - Event detail
eventsRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        site: true
      }
    });

    if (!event) {
      return res.status(404).json({ error: 'Cultural event not found' });
    }

    return res.json(event);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch event detail' });
  }
});

// GET /api/events/:slug/ics - Add to calendar (.ics download)
eventsRouter.get('/:slug/ics', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const event = await prisma.event.findUnique({
      where: { slug },
      include: { site: true }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const location = event.site ? `${event.site.name}, ${event.site.district}` : (event.location || 'India');
    const icsContent = generateICS({
      title: event.title,
      description: `${event.description}\n\nTraditions & Significance:\n${event.traditions}`,
      location,
      startDate: event.startDate,
      endDate: event.endDate,
      url: `https://itihasa.org/events/${event.slug}`
    });

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${event.slug}.ics"`);
    return res.send(icsContent);
  } catch (error) {
    console.error('ICS generation error:', error);
    return res.status(500).json({ error: 'Failed to generate calendar event' });
  }
});

// Admin endpoints
const eventSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  type: z.enum(['festival', 'ritual', 'fair', 'performance', 'exhibition']),
  startDate: z.string().datetime().or(z.string()),
  endDate: z.string().datetime().or(z.string()),
  siteId: z.string().nullable().optional(),
  description: z.string(),
  traditions: z.string(),
  coverImage: z.string(),
  location: z.string().optional()
});

eventsRouter.post('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = eventSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation error', details: parsed.error.format() });
    }

    const newEvent = await prisma.event.create({
      data: {
        ...parsed.data,
        startDate: new Date(parsed.data.startDate),
        endDate: new Date(parsed.data.endDate)
      }
    });

    return res.status(201).json(newEvent);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create event' });
  }
});

eventsRouter.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({ where: { id } });
    return res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete event' });
  }
});
