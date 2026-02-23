import { z } from 'zod';

export const phieuMuonTraSchema = z
  .object({
    id: z.string().optional(),
    loaiDoiTuong: z.number().default(1),
    // Cho phép null hoặc chuỗi rỗng để không bị lỗi định dạng UUID khi không dùng tới
    sinhVienId: z.string().nullable().optional().or(z.literal('')),
    giangVienId: z.string().nullable().optional().or(z.literal('')),
    ngayMuon: z.any(),
    ngayTraDuKien: z.any(),
    ghiChu: z.string().max(500).optional(),
    chiTietPhieuMuons: z
      .array(
        z.object({
          thietBiId: z.string().min(1, 'Phải chọn thiết bị'),
          tinhTrangKhiMuon: z.string().default('Bình thường'),
        }),
      )
      .min(1, 'Phải chọn ít nhất 1 thiết bị'),
  })
  .superRefine((data, ctx) => {
    // Kiểm tra logic dựa trên loại đối tượng
    if (data.loaiDoiTuong === 1) {
      if (!data.sinhVienId || data.sinhVienId === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng chọn sinh viên',
          path: ['sinhVienId'],
        });
      }
    } else if (data.loaiDoiTuong === 2) {
      if (!data.giangVienId || data.giangVienId === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng chọn giảng viên',
          path: ['giangVienId'],
        });
      }
    }
  });

export interface PhieuMuonTraFilterState {
  maPhieu?: string;
  tenNguoiMuon?: string;
  maThietBi?: string;
  tenThietBi?: string;
  trangThaiText?: string;
  loaiDoiTuongText?: string;
}
