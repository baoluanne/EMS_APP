import { z } from 'zod';

export const TimKiemLopHoc = z.object({
  id: z.string().optional(),
});

export type TimKiemLopHocSchema = z.input<typeof TimKiemLopHoc>;
