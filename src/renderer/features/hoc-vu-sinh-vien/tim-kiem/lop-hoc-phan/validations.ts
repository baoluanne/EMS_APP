import { z } from 'zod';

const trimStr = z.string().trim();

export const TimKiemLHPSchema = z.object({
  maLHP: trimStr.optional(),

  idHocKy: trimStr.min(1, 'Đợt là bắt buộc'),
  idCoSo: trimStr.optional(),
  idKhoaHoc: trimStr.optional(),
  idNganh: trimStr.optional(),
  idLopDanhNghia: trimStr.optional(),
  loaiLHP: trimStr.optional(),
  loaiMonLTTH: trimStr.optional(),
  idLoaiDaoTao: trimStr.optional(),
  lopBanDau: trimStr.optional(),
  idLoaiMonHoc: trimStr.optional(),
  trangThaiLHP: trimStr.optional(),
  idKhoaChuQuan: trimStr.optional(),
  idBacDaoTao: trimStr.optional(),
  idChuyenNganh: trimStr.optional(),
  idMonHoc: trimStr.optional(),
  tenMonHoc: trimStr.optional(),
  idHinhThucThi: trimStr.optional(),

  ngayHocCuoiTu: trimStr.optional(),
  ngayHocCuoiDen: trimStr.optional(),
});

export type TimKiemLHPType = z.input<typeof TimKiemLHPSchema>;
