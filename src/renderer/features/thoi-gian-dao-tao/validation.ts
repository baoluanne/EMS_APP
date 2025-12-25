import { z } from 'zod';

export const ThoiGianDaoTaoSchema = z.object({
  id: z.string().optional(),
  idBacDaoTao: z
    .string({ required_error: 'Bậc đào tạo là bắt buộc' })
    .min(1, { message: 'Bậc đào tạo là bắt buộc' }),
  idLoaiDaoTao: z
    .string({ required_error: 'Loại đào tạo là bắt buộc' })
    .min(1, { message: 'Loại đào tạo là bắt buộc' }),
  idKhoiNganh: z.string().nullable().optional(),
  thoiGianKeHoach: z.coerce.number().min(0).optional(),
  thoiGianToiThieu: z.coerce.number().min(0).optional(),
  thoiGianToiDa: z.coerce.number().min(0).optional(),
  hanCheDKHP: z.string().nullable().optional(),
  giayBaoTrungTuyen: z.string().nullable().optional(),
  idBangTotNghiep: z.string().uuid().nullable().optional(),
  idBangDiemTN: z.string().uuid().nullable().optional(),
  heSoDaoTao: z.coerce.number().min(0).optional(),
  kyTuMaSV: z.string().nullable().optional(),
  ghiChu: z.string().nullable().optional(),
});

export type ThoiGianDaoTao = z.infer<typeof ThoiGianDaoTaoSchema>;

// Default values for the form
export const defaultThoiGianDaoTao: ThoiGianDaoTao = {
  id: undefined,
  idBacDaoTao: '',
  idLoaiDaoTao: '',
  idKhoiNganh: undefined,
  thoiGianKeHoach: undefined,
  thoiGianToiThieu: undefined,
  thoiGianToiDa: undefined,
  hanCheDKHP: undefined,
  giayBaoTrungTuyen: undefined,
  idBangTotNghiep: undefined,
  idBangDiemTN: undefined,
  heSoDaoTao: undefined,
  kyTuMaSV: undefined,
  ghiChu: undefined,
};
