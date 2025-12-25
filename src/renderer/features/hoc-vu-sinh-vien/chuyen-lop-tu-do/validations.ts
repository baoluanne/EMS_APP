import { z } from 'zod';
import { PhanLoaiChuyenLop } from '@renderer/shared/enums';

export const ChuyenLopTuDo = z
  .object({
    sinhVien: z.object(
      {
        id: z.string().uuid(),
        lopHoc: z.object({
          id: z.string().uuid(),
          idNganhHoc: z.string().uuid(),
        }),
      },
      { message: 'Vui lòng chọn sinh viên' },
    ),
    lopHocMoi: z.object(
      {
        id: z.string().uuid(),
        idNganhHoc: z.string().uuid(),
      },
      { message: 'Lớp học mới là bắt buộc' },
    ),
    phanLoaiChuyenLop: z.nativeEnum(PhanLoaiChuyenLop, {
      message: 'Phân loại chuyển lớp là bắt buộc',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.sinhVien.lopHoc.id === data.lopHocMoi.id) {
      ctx.addIssue({
        path: [z.ZodIssueCode.custom],
        code: z.ZodIssueCode.custom,
        message: 'Lớp cũ và lớp mới không được trùng nhau',
      });
    }
    if (
      data.phanLoaiChuyenLop === PhanLoaiChuyenLop.ChuyenLopCungNganh &&
      data.sinhVien.lopHoc.idNganhHoc !== data.lopHocMoi.idNganhHoc
    ) {
      ctx.addIssue({
        path: [z.ZodIssueCode.custom],
        code: z.ZodIssueCode.custom,
        message: 'Lớp cũ và lớp mới không được khác ngành',
      });
    }
    if (
      data.phanLoaiChuyenLop === PhanLoaiChuyenLop.ChuyenLopTuDo &&
      data.sinhVien.lopHoc.idNganhHoc === data.lopHocMoi.idNganhHoc
    ) {
      ctx.addIssue({
        path: [z.ZodIssueCode.custom],
        code: z.ZodIssueCode.custom,
        message: 'Lớp cũ và lớp mới không được cùng ngành',
      });
    }
  });

export type ChuyenLopTuDoSchema = z.input<typeof ChuyenLopTuDo>;

export const HocPhanFilter = z.object({
  id: z.string().optional(),
  idSinhVien: z.string().uuid().optional(),
});

export type HocPhanFilterSchema = z.input<typeof HocPhanFilter>;
