import { z } from 'zod';

export const DanhMucNganhDaoTaoSchema = z.object({
  id: z.string().uuid().optional(),
  maNganh: z
    .string({ required_error: 'Mã ngành là bắt buộc' })
    .trim()
    .min(1, 'Mã ngành là bắt buộc'),
  tenNganh: z
    .string({ required_error: 'Tên ngành là bắt buộc' })
    .trim()
    .min(1, 'Tên ngành là bắt buộc'),
  tenTiengAnh: z.string().nullable().optional(),
  tenVietTat: z.string().nullable().optional(),
  idKhoa: z.string({ required_error: 'Khoa là bắt buộc' }).uuid().min(1, 'Khoa là bắt buộc'),
  maTuyenSinh: z
    .string({ required_error: 'Mã tuyển sinh là bắt buộc' })
    .trim()
    .min(1, 'Mã tuyển sinh là bắt buộc'),
  kyTuMaSV: z.string().trim().nullable().optional(),
  khoiThi: z.string().trim().nullable().optional(),
  idKhoiNganh: z.string().trim().nullable().optional(),
  stt: z.coerce.number().max(10, 'STT không được vượt quá 10').optional(),
  ghiChu: z.string().trim().nullable().optional(),
  isVisible: z.boolean(),
});

export type DanhMucNganhDaoTao = z.infer<typeof DanhMucNganhDaoTaoSchema>;
