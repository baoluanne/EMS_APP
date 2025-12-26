import { z } from 'zod';

export const donKtxSchema = z
  .object({
    idSinhVien: z.string().min(1, 'Vui lòng chọn sinh viên'),
    loaiDon: z.string().min(1, 'Vui lòng chọn loại đơn'),

    ngayBatDau: z.any().refine((val) => val !== null && val !== undefined, {
      message: 'Vui lòng chọn ngày bắt đầu',
    }),
    ngayHetHan: z.any().nullable().optional(),

    ghichu: z.string().optional().default(''),
    phongHienTai: z.string().nullable().optional(),
    phongMuonChuyen: z.string().nullable().optional(),
    lyDoChuyen: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.loaiDon === 'ChuyenPhong' && !data.phongMuonChuyen) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Vui lòng chọn phòng muốn chuyển đến',
        path: ['phongMuonChuyen'],
      });
    }
  });

export type DonKtxSchemaType = z.infer<typeof donKtxSchema>;
