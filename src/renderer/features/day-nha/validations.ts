import { z } from 'zod';

export const DayNhaSchema = z.object({
  id: z.string().optional(),
  maDayNha: z
    .string({ required_error: 'Mã dãy nhà là bắt buộc.' })
    .trim()
    .min(1, { message: 'Mã dãy nhà là bắt buộc.' }),
  tenDayNha: z
    .string({ required_error: 'Tên dãy nhà là bắt buộc.' })
    .trim()
    .min(1, { message: 'Tên dãy nhà là bắt buộc.' }),
  soTang: z.coerce.number().optional(),
  soPhong: z.coerce.number().optional(),
  ghiChu: z.string().nullable().optional(),
  phongHoc: z.any().optional(),
  idDiaDiemPhong: z
    .string({ required_error: 'Địa điểm phòng là bắt buộc.' })
    .min(1, { message: 'Địa điểm phòng là bắt buộc.' }),
});

export type DayNha = z.infer<typeof DayNhaSchema>;
