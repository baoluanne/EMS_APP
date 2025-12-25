import { z } from 'zod';

export const HocKySchema = z.object({
  id: z.string().uuid().optional(),
  idNamHoc: z.string({ required_error: 'Năm học là bắt buộc' }).uuid(),
  tenDot: z
    .string({ required_error: 'Tên đợt là bắt buộc' })
    .trim()
    .min(1, { message: 'Tên đợt là bắt buộc' })
    .max(50, 'Tên đợt không được quá 50 ký tự'),
  soThuTu: z.coerce.number({
    required_error: 'Số thứ tự là bắt buộc',
    invalid_type_error: 'Số thứ tự phải là số',
  }),
  soTuan: z.coerce.number().nullable().optional(),
  heSo: z.coerce.number().nullable().optional(),
  tuThang: z.coerce.number().nullable().optional(),
  denThang: z.coerce.number().nullable().optional(),
  namHanhChinh: z.string().max(20).nullable().optional(),
  tuNgay: z.coerce.date().optional().nullable(),
  denNgay: z.coerce.date().optional().nullable(),
  tenDayDu: z.string().max(200).nullable().optional(),
  tenTiengAnh: z.string().max(200).nullable().optional(),
  ghiChu: z.string().max(300).nullable().optional(),
  isActive: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  isDKHP: z.boolean().default(false),
  isDKNTTT: z.boolean().default(false),
});

// 2. Export type
export type HocKy = z.input<typeof HocKySchema>;

export const defaultHocKy: HocKy = {
  id: '',
  idNamHoc: '',
  tenDot: '',
  soThuTu: 1,
  soTuan: null,
  heSo: null,
  tuThang: null,
  denThang: null,
  namHanhChinh: null,
  tuNgay: null,
  denNgay: null,
  tenDayDu: null,
  tenTiengAnh: null,
  ghiChu: null,
  isActive: false,
  isVisible: true,
  isDKHP: false,
  isDKNTTT: false,
};
