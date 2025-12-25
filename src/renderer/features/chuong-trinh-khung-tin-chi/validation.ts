import { z } from 'zod';
import { ChiTietKhungHocKy_TinChiSchema } from '../lap-chuong-trinh-khung-tin-chi/validation';

export const ChuongTrinhKhungTinChiSchema = z.object({
  id: z.string().uuid().optional(),

  maChuongTrinh: z.string().nullable().optional(),
  tenChuongTrinh: z.string().nullable().optional(),
  isBlock: z.boolean(),
  ghiChu: z.string().nullable().optional(),
  ghiChuTiengAnh: z.string().nullable().optional(),

  idCoSoDaoTao: z.string().uuid({ message: 'Cơ sở Đào tạo không hợp lệ.' }),
  idKhoaHoc: z.string().uuid({ message: 'Khóa học không hợp lệ.' }),
  idLoaiDaoTao: z.string().uuid({ message: 'Loại Đào tạo không hợp lệ.' }),
  idNganhHoc: z.string().uuid({ message: 'Ngành học không hợp lệ.' }),
  idBacDaoTao: z.string().uuid({ message: 'Bậc Đào tạo không hợp lệ.' }),
  idChuyenNganh: z.string().uuid({ message: 'Chuyên ngành không hợp lệ.' }),

  coSoDaoTao: z.any().optional(),
  khoaHoc: z.any().optional(),
  loaiDaoTao: z.any().optional(),
  nganhHoc: z.any().optional(),
  bacDaoTao: z.any().optional(),
  chuyenNganh: z.any().optional(),

  chiTietKhungHocKy_TinChis: z.array(ChiTietKhungHocKy_TinChiSchema)
});

export type ChuongTrinhKhungTinChi = z.infer<typeof ChuongTrinhKhungTinChiSchema>;