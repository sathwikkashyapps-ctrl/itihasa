import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { authenticateAdmin } from '../middleware/auth';

export const submissionsRouter = Router();

const createSubmissionSchema = z.object({
  type: z.enum(['site', 'event', 'story', 'photo']),
  submitterName: z.string().min(2, 'Name must be at least 2 characters'),
  submitterEmail: z.string().email('Invalid email address'),
  payload: z.record(z.any()), // Form data object
  honeypot: z.string().optional() // Honeypot field must be empty
});

// POST /api/submissions - Public contribution with honeypot check
submissionsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = createSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation error', details: parsed.error.format() });
    }

    const { type, submitterName, submitterEmail, payload, honeypot } = parsed.data;

    // Honeypot spam defense: if bot filled this invisible field, return fake success without storing
    if (honeypot && honeypot.trim().length > 0) {
      console.warn(`Spam bot caught via honeypot from ${submitterEmail}`);
      return res.status(201).json({ message: 'Submission received for review', id: 'fake-id' });
    }

    const submission = await prisma.submission.create({
      data: {
        type,
        submitterName,
        submitterEmail,
        payload: JSON.stringify(payload),
        status: 'pending'
      }
    });

    return res.status(201).json({
      message: 'Thank you for your valuable contribution! It is currently in the moderation review queue.',
      submissionId: submission.id
    });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ error: 'Failed to process submission' });
  }
});

// Admin: GET /api/submissions
submissionsRouter.get('/', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { status = 'all', type } = req.query;
    const where: any = {};
    if (status !== 'all') {
      where.status = String(status);
    }
    if (type && type !== 'all') {
      where.type = String(type);
    }

    const submissions = await prisma.submission.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    const parsedSubmissions = submissions.map(sub => {
      let parsedPayload = {};
      try {
        parsedPayload = JSON.parse(sub.payload);
      } catch (e) {
        parsedPayload = { raw: sub.payload };
      }
      return {
        ...sub,
        payload: parsedPayload
      };
    });

    return res.json(parsedSubmissions);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Admin: PATCH /api/submissions/:id/status
submissionsRouter.patch('/:id/status', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: {
        status,
        notes: notes !== undefined ? notes : undefined
      }
    });

    // If approved and it is a story/site, optionally promote it or leave it flagged as approved
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update submission status' });
  }
});

// Admin: DELETE /api/submissions/:id
submissionsRouter.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.submission.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete submission' });
  }
});
