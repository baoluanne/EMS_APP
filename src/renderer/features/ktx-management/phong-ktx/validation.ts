import { z } from 'zod';

// ✅ FIX: Update schema với constants đúng từ backend
export const phongKtxSchema = z.object({
  id: z.string().nullable().optional(),
  maPhong: z.string().min(1, 'Mã phòng là bắt buộc'),
  toaNhaId: z.string().min(1, 'Tòa nhà là bắt buộc'),
  tenToaNha: z.string().optional(),
  soLuongGiuong: z.number().min(4, 'Tối thiểu 4 giường').max(12, 'Tối đa 12 giường'),
  soLuongDaO: z.number().optional().default(0),
  trangThai: z.string().default('HOAT_DONG'),
  giaPhong: z.number().min(0, 'Giá phòng không được âm'),
});

export type PhongKtxs = z.infer<typeof phongKtxSchema>;

// ✅ FIX: FilterState type - tất cả optional
export interface PhongKtxFilterState {
  maPhong?: string;
  toaNhaId?: string;
  trangThai?: string;
}

// ✅ FIX: Default filters - undefined
export const phongKtxDefaultFilters: PhongKtxFilterState = {
  maPhong: undefined,
  toaNhaId: undefined,
  trangThai: undefined,
};
