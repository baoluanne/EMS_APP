import { z } from 'zod';

export const PhongHocSchema = z.object({
  id: z.string().optional(),
  maPhong: z
    .string({
      required_error: 'Mã phòng là bắt buộc',
    })
    .trim()
    .min(1, { message: 'Mã phòng là bắt buộc' }),
  tenPhong: z
    .string({
      required_error: 'Tên phòng là bắt buộc',
    })
    .trim()
    .min(1, { message: 'Tên phòng là bắt buộc' }),
  soBan: z.coerce.number().nonnegative('Số bàn không được âm').optional(),
  soChoNgoi: z.coerce.number().nonnegative('Số chỗ ngồi không được âm').optional(),
  soChoThi: z.coerce.number().nonnegative('Số chỗ thi không được âm').optional(),
  isNgungDungMayChieu: z.boolean({
    required_error: 'Trạng thái máy chiếu là bắt buộc',
  }),
  ghiChu: z.string().nullable().optional(),

  idDayNha: z
    .string({
      required_error: 'ID dãy nhà là bắt buộc',
    })
    .min(1, { message: 'Trường này không được để trống.' }),
  idTCMonHoc: z
    .string({
      required_error: 'Tin chỉ môn học là bắt buộc',
    })
    .min(1, { message: 'Trường này không được để trống.' }),
  idLoaiPhong: z
    .string({
      required_error: 'Loại  phòng là bắt buộc',
    })
    .min(1, { message: 'Trường này không được để trống.' }),
});

export type PhongHoc = z.infer<typeof PhongHocSchema>;
