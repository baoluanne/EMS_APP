import { z } from 'zod';

// Helpers
const optionalString = z.preprocess(
  (val) => (val === null || val === undefined ? '' : val),
  z.string().optional(),
);

// --- Main schema ---
export const lopHocSchema = z.object({
  id: z.string().trim().optional().nullable(),
  idCoSoDaoTao: z.string().trim().min(1, 'Cơ sở là bắt buộc'),
  idKhoaHoc: z.string().trim().min(1, 'Khóa học là bắt buộc'),
  idBacDaoTao: z.string().trim().min(1, 'Bậc đào tạo là bắt buộc'),
  idLoaiDaoTao: z.string().trim().min(1, 'Loại đào tạo là bắt buộc'),
  idNganhHoc: z.string().trim().min(1, 'Ngành là bắt buộc'),
  idChuyenNganh: z.string().trim().min(1, 'Chuyên ngành là bắt buộc'),
  idKhoa: z.string().trim().min(1, 'Khoa là bắt buộc'),
  soHopDong: z.string().trim().optional().nullable(),
  soQuyetDinhThanhLapLop: z.string().optional().nullable(),
  maLop: z.string().trim().min(1, 'Mã lớp học là bắt buộc'),
  siSoHienTai: z.coerce.number({ message: 'Sỉ số là bắt buộc' }).min(0, 'Sỉ số không hợp lệ'),
  tenLop: z.string().trim().min(1, 'Tên lớp học là bắt buộc'),
  tenTiengAnh: z.string().trim().optional().nullable(),
  idCaHoc: z.string().trim().optional().nullable(),
  idGiangVienChuNhiem: z.string().trim().optional().nullable(),
  idCoVanHocTap: z.string().trim().optional().nullable(),
  ngayHopDong: z.string().trim().optional().nullable(),
  ngayRaQuyetDinh: z.string().trim().optional().nullable(),
  kyTuMSSV: z.string().trim().optional().nullable(),
  ghiChu: optionalString,
  isVisible: z.boolean().optional().default(true),
});

export type LopHocSchema = z.input<typeof lopHocSchema>;
