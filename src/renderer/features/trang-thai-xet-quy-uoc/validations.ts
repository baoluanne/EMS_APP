import { z } from 'zod';

export const TrangThaiXetQuyUocSchema = z.object({
    id: z.string().uuid().optional(),

    maTrangThaiXetQuyUoc: z.string(),
    tenTrangThaiXetQuyUoc: z.string(),

    stt: z.number().nullable().optional(),
    ghiChu: z.string().nullable().optional(),
});

export type TrangThaiXetQuyUoc = z.infer<typeof TrangThaiXetQuyUocSchema>;