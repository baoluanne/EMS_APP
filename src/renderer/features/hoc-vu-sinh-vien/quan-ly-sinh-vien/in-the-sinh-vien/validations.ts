import { z } from 'zod';

// --- Main schema ---
export const schema = z.object({
  id: z.string().optional(),
});

export type MainSchema = z.input<typeof schema>;
