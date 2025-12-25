import { z } from 'zod';

export const CapNhatTrangThaiSinhVienSchema = z.object({
  trangThaiMoi: z.coerce.number({
    required_error: 'Trạng thái sinh viên là bắt buộc.',
    invalid_type_error: 'Trạng thái sinh viên là bắt buộc.',
  }),
  soQuyetDinh: z
    .string({ required_error: 'Số quyết định là bắt buộc.' })
    .trim()
    .min(1, 'Số quyết định là bắt buộc.'),
  ngayRaQuyetDinh: z.coerce.date({
    required_error: 'Ngày ra quyết định là bắt buộc.',
    invalid_type_error: 'Ngày ra quyết định không hợp lệ.',
  }),
  idLoaiQuyetDinh: z
    .string({ required_error: 'Loại quyết định là bắt buộc.' })
    .trim()
    .min(1, 'Loại quyết định là bắt buộc.'),
  ngayHetHan: z.coerce.date().nullable().optional(),
  ghiChu: z.string().trim().nullable().optional(),
  ngayTao: z.coerce.date().nullable().optional(),
});

export type CapNhatTrangThaiSinhVienFormValues = z.infer<typeof CapNhatTrangThaiSinhVienSchema>;

export const capNhatTrangThaiSinhVienDefaultValues: CapNhatTrangThaiSinhVienFormValues = {
  trangThaiMoi: undefined as unknown as number,
  soQuyetDinh: '',
  ngayRaQuyetDinh: undefined as unknown as Date,
  idLoaiQuyetDinh: '',
  ngayHetHan: null,
  ghiChu: '',
  ngayTao: null,
};
