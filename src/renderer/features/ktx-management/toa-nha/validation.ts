import { z } from 'zod';

export const toaNhaSchema = z.object({
  id: z.string().nullable().optional(),
  tenToaNha: z.string().nullable().optional(),
  loaiToaNha: z.string().nullable().optional(),
});

export type ToaNhaKtx = z.infer<typeof toaNhaSchema>;
