import { z } from 'zod';
export const donKtxSchema = z
  .object({
    sinhVienId: z.string().min(1, 'Vui lòng chọn sinh viên'),
    loaiDon: z.string().min(1, 'Vui lòng chọn loại đơn'),
    ghiChu: z.string().optional().default(''),
    lyDo: z.string().optional().default(''),
    phongHienTaiId: z.string().nullable().default(null),
    phongMuonChuyenId: z.string().nullable().default(null),
    ngayBatDau: z.coerce.date(),
    ngayHetHan: z.coerce.date().optional().nullable(),
    ngayGuiDon: z.coerce.date(),
  })
  .refine(
    (data) => {
      if (data.loaiDon === 'ChuyenPhong') {
        return data.phongMuonChuyenId !== null;
      }
      return true;
    },
    {
      message: 'Vui lòng chọn phòng mong muốn khi chuyển phòng',
      path: ['phongMuonChuyenId'],
    },
  );
