import { z } from 'zod';

export const ApDungQuyCheHocVuSchema = z.object({
  id: z.string().optional(),
  idKhoaHoc: z.string({ required_error: 'Khóa học là bắt buộc.' }),
  idBacDaoTao: z.string({ required_error: 'Bậc đào tạo là bắt buộc.' }),
  idLoaiDaoTao: z.string({ required_error: 'Loại đào tạo là bắt buộc.' }),
  quyChe: z.any().optional(),
  idQuyCheTC: z.string().nullable().optional(),
  idQuyCheNC: z.string().nullable().optional(),
  choPhepNoMon: z.coerce.number({
    required_error: 'Cho phép nợ môn là bắt buộc.',
    invalid_type_error: 'Cho phép nợ môn là bắt buộc.',
  }),
  choPhepNoDVHT: z.coerce.number({
    required_error: 'Cho phép nợ DVHT là bắt buộc.',
    invalid_type_error: 'Cho phép nợ DVHT là bắt buộc.',
  }),
  ghiChu: z.string().nullable().optional(),
});
export type ApDungQuyCheHocVu = z.infer<typeof ApDungQuyCheHocVuSchema>;