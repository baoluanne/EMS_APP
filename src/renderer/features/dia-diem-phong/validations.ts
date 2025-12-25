import { z } from 'zod';

export const diaDiemPhongSchema = z.object({
  id: z.string().optional(),
  maDDPhong: z
    .string({ required_error: 'Mã địa điểm phòng là bắt buộc' })
    .trim()
    .min(1, { message: 'Mã địa điểm phòng là bắt buộc.' }),
  tenNhomDDPhong: z
    .string({ required_error: 'Tên nhóm địa điểm phòng là bắt buộc.' })
    .trim()
    .min(1, { message: 'Tên nhóm địa điểm phòng là bắt buộc.' }),
  diaChi: z
    .string({ required_error: 'Địa chỉ là bắt buộc.' })
    .trim()
    .min(1, { message: 'Địa chỉ là bắt buộc.' }),
  idCoSoDaoTao: z
    .string({ required_error: 'Cơ sở đào tạo là bắt buộc.' })
    .min(1, { message: 'Cơ sở đào tạo là bắt buộc.' }),
  diaDiem: z
    .string({ required_error: 'Địa điểm là bắt buộc.' })
    .trim()
    .min(1, { message: 'Địa điểm là bắt buộc.' }),
  banKinh: z.coerce.number({ invalid_type_error: 'Bán kính phải là một số.' }).optional(),
  ghiChu: z.string({ invalid_type_error: 'Ghi chú phải là chuỗi.' }).optional(),
});

export type DiaDiemPhong = z.infer<typeof diaDiemPhongSchema>;
