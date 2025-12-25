import { z } from 'zod';

export const TiepNhanHoSoSVSchema = z.object({
  id: z.string().nullable().optional(),
  idSinhVien: z.string().nullable().optional(),
  maVach: z.string().nullable().optional(),
  congNoHocPhi: z.string().nullable().optional(),
  khoanThuKhac: z.string().nullable().optional(),
  soBanIn: z.string().nullable().optional(),
  inBienNhan: z.boolean().nullable().optional(),
  xemIn: z.boolean().nullable().optional(),
  isTiepNhan: z.boolean().nullable().optional(),
  ghiChu: z.string().nullable().optional(),
});
export type TiepNhanHoSoSVType = z.input<typeof TiepNhanHoSoSVSchema>;

export const ThongTinSinhVienHoSoSchema = z.object({
  idSinhVien: z.string().nullable().optional(),
  maSinhVien: z
    .string({
      required_error: 'Mã sinh viên là bắt buộc',
    })
    .min(1, 'Mã sinh viên không được rỗng'),
  hoTen: z.string().nullable().optional(),
  ngaySinh: z.preprocess((val) => {
    if (!val) return null;
    const d = new Date(val as string);
    return isNaN(d.getTime()) ? null : d;
  }, z.date().nullable().optional()),
  gioiTinh: z.coerce.number().min(0).optional(),
  idKhoaHoc: z.string().nullable().optional(),
  idNganh: z.string().nullable().optional(),
  idBacDaoTao: z.string().nullable().optional(),
  idLoaiDaoTao: z.string().nullable().optional(),
  lopHoc: z.string().nullable().optional(),
  trangThai: z.coerce.number().min(0).optional(),
  anhSinhVienUrl: z.string().nullable().optional(),
  isTiepNhan: z.boolean().nullable().optional(),
});
export type ThongTinSinhVienHoSoType = z.input<typeof ThongTinSinhVienHoSoSchema>;
