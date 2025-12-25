import { z } from 'zod';

export const DangNhapSchema = z.object({
  email: z.string({ required_error: 'Email không được để trống' }),
  password: z.string({ required_error: 'Mật khẩu không được để trống' }),
});
