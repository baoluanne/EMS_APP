import { z } from 'zod';

// Helpers
const trimStr = z.string().trim();
const optionalString = z.preprocess(
  (val) => (val === null || val === undefined ? '' : val),
  z.string().optional(),
);

// const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
//   z.preprocess((v) => (typeof v === 'string' && v.trim() === '' ? undefined : v), schema);

// --- Main schema ---
export const bacDaoTaoSchema = z.object({
  maBacDaoTao: trimStr.min(1, 'Mã bậc đào tạo là bắt buộc'),
  tenBacDaoTao: trimStr.min(1, 'Tên bậc đào tạo là bắt buộc'),
  id: z.string().uuid().optional(),
  hinhThucDaoTao: optionalString,
  stt: z.coerce.number().min(0).optional(),
  ghiChu: optionalString,
  tenTiengAnh: optionalString,
  isVisible: z.boolean().optional().default(true),
  tenLoaiBangCapTN: optionalString,
  tenLoaiBangCapTN_ENG: optionalString,
  phongBanKyBM: optionalString,
});

export type BacDaoTaoSchema = z.input<typeof bacDaoTaoSchema>;
