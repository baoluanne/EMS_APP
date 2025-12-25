import { z } from 'zod';

export const congNoSchema = z.object({
  id: z.string().nullable().optional(),
  sinhVienId: z.string().min(1, 'Vui lòng chọn sinh viên'),
  namHocHocKyId: z.string().min(1, 'Vui lòng chọn học kỳ'),

  daThu: z.coerce.number().default(0),
  tongMienGiam: z.coerce.number().default(0),

  hanNop: z
    .any()
    .transform((val) => {
      if (!val) return null;
      return String(val);
    })
    .nullable()
    .optional(),

  ghiChu: z.string().nullable().optional(),

  namHocId: z.string().optional(),
  hocKyId: z.string().optional(),
});

export type CongNoSchema = z.infer<typeof congNoSchema>;
