import { z } from 'zod';
import { ChiTietChuongTrinhKhung_NienCheSchema } from '../lap-chuong-trinh-khung-nien-che/validation';

export const ChuongTrinhKhungNienCheSchema = z.object({
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

  chiTietChuongTrinhKhungNienChes: z.array(ChiTietChuongTrinhKhung_NienCheSchema),
});

export type ChuongTrinhKhungNienChe = z.infer<typeof ChuongTrinhKhungNienCheSchema>;

export const LopHocCTKNienCheSchema = z.object({
  id: z.string().uuid().optional(),
  maLop: z.string().nullable().optional(),
  tenLop: z.string().nullable().optional(),
});

export type LopHocCTKNienCheType = z.infer<typeof LopHocCTKNienCheSchema>;
