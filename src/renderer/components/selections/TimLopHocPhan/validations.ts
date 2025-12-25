import { z } from 'zod';

export const TimKiemLopHoc = z.object({
  maLHP: z.string().optional(),
  idDot: z.string({ required_error: 'Đợt là bắt buộc' }).min(1, 'Đợt là bắt buộc'),

  idKhoaChuQuan: z.string().optional(),
  idCoSoDaoTao: z.string().optional(),
  idKhoaHoc: z.string().optional(),
  idBacDaoTao: z.string().optional(),
  idLoaiDaoTao: z.string().optional(),
  idNganh: z.string().optional(),
  idChuyenNganh: z.string().optional(),
  idLopDanhNghia: z.string().optional(),

  lopBanDau: z.string().optional(),

  idMonHoc: z.string().optional(),
  idLoaiLopHP: z.string().optional(),
  idLoaiMonHoc: z.string().optional(),
  idHinhThucThi: z.string().optional(),
  idLoaiMonLTTH: z.string().optional(),
  idTrangThaiLopHP: z.string().optional(),

  ngayHocCuoiTu: z.date().nullable().optional(),
  ngayHocCuoiDen: z.date().nullable().optional(),
});

export type TimKiemLopHocSchema = z.input<typeof TimKiemLopHoc>;

export const defaultThongTinTimKiemLopHocState: TimKiemLopHocSchema = {
  maLHP: '',
  idDot: '',
  idKhoaChuQuan: undefined,
  idCoSoDaoTao: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idNganh: undefined,
  idChuyenNganh: undefined,
  idLopDanhNghia: undefined,
  lopBanDau: '',
  idMonHoc: undefined,
  idLoaiLopHP: undefined,
  idLoaiMonHoc: undefined,
  idHinhThucThi: undefined,
  idLoaiMonLTTH: undefined,
  idTrangThaiLopHP: undefined,
  ngayHocCuoiTu: null,
  ngayHocCuoiDen: null,
};
