import { z } from 'zod';
import { LoaiChuyenLop } from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop/types';

// --- Main schema ---
export const ChuyenLopSchema = z
  .object({
    lopCu: z.object({
      id: z.string().uuid({ message: 'Lớp học cũ là bắt buộc' }),
      idNganhHoc: z.string().uuid({ message: 'Lớp học cũ là bắt buộc' }),
    }),
    lopMoi: z.object({
      id: z.string().uuid({ message: 'Lớp học mới là bắt buộc' }),
      idNganhHoc: z.string().uuid({ message: 'Lớp học mới là bắt buộc' }),
    }),
    sinhVienLopCu: z.array(z.object({ id: z.string().uuid() })),
    sinhVienLopMoi: z.array(z.object({ id: z.string().uuid() })),
    loaiChuyenLop: z.nativeEnum(LoaiChuyenLop),
  })
  .superRefine((data, ctx) => {
    if (data.lopCu.id === data.lopMoi.id) {
      ctx.addIssue({
        path: [z.ZodIssueCode.custom],
        code: z.ZodIssueCode.custom,
        message: 'Lớp cũ và lớp mới không được trùng nhau',
      });
    }
    if (data.lopCu.idNganhHoc !== data.lopMoi.idNganhHoc) {
      ctx.addIssue({
        path: [z.ZodIssueCode.custom],
        code: z.ZodIssueCode.custom,
        message: 'Lớp cũ và lớp mới không được khác ngành',
      });
    }
  });

export type ChuyenLopSchemaType = z.input<typeof ChuyenLopSchema>;
