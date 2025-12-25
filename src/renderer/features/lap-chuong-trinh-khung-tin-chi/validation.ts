import { z } from 'zod';
import { MonHocBacDaoTaoSchema } from '../mon-hoc-bac-dao-tao/validations';

const ChuongTrinhKhungTinChiSchema = z.object({
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
});
export const ChiTietKhungHocKy_TinChiSchema = z.object({
  id: z.string().uuid().optional(),
  isBatBuoc: z.boolean().optional(),
  idMonHocBacDaoTao: z.string().uuid().optional(),
  monHocBacDaoTao: MonHocBacDaoTaoSchema.optional(),
  hocKy: z.number().int(),
  soTinChiBatBuoc: z.number().int().optional(),
  soTinChiTuChon: z.number().int().optional(),
  idChuongTrinhKhung: z.string().uuid().optional(),
  chuongTrinhKhungTinChi: ChuongTrinhKhungTinChiSchema.optional(),
});

export type ChiTietKhungHocKy_TinChi = z.infer<typeof ChiTietKhungHocKy_TinChiSchema>;
