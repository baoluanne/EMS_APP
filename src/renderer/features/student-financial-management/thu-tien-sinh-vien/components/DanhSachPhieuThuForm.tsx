import { useEffect, useState } from 'react';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import axios from 'axios';
import { env } from '@renderer/shared/configs/env.config';

import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterSelect } from '@renderer/components/fields';
import { SinhVienSelection } from '@renderer/components/selections/SinhVienSelection';
import { CongNoChuaDong } from '../type';

interface DanhSachPhieuThuFormProps {
  setSelectedStudent: (val: any) => void;
}

export const DanhSachPhieuThuForm = ({ setSelectedStudent }: DanhSachPhieuThuFormProps) => {
  const { control, setValue } = useFormContext();

  const [dsCongNo, setDsCongNo] = useState<CongNoChuaDong[]>([]);
  const [isLoadingCongNo, setIsLoadingCongNo] = useState(false);

  const watchSinhVien = useWatch({ control, name: 'sinhVienId' });
  const watchCongNo = useWatch({ control, name: 'congNoId' });

  useEffect(() => {
    if (watchSinhVien) {
      setSelectedStudent((prev: any) => ({ ...prev, id: watchSinhVien }));

      const fetchCongNo = async () => {
        setIsLoadingCongNo(true);
        try {
          setValue('congNoId', '');
          setValue('soTien', 0);

          const token = localStorage.getItem('accessToken');
          const response = await axios.get(
            `${env.API_ENDPOINT}/PhieuThu/chua-dong/${watchSinhVien}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
          setDsCongNo(data);
        } catch (error) {
          console.error('Lỗi kết nối:', error);
          setDsCongNo([]);
        } finally {
          setIsLoadingCongNo(false);
        }
      };
      fetchCongNo();
    } else {
      setSelectedStudent(null);
      setDsCongNo([]);
    }
  }, [watchSinhVien, setSelectedStudent, setValue]);
  useEffect(() => {
    if (watchCongNo && dsCongNo.length > 0) {
      const selectedCongNo = dsCongNo.find((x) => x.congNoId === watchCongNo);
      if (selectedCongNo) {
        setValue('soTien', selectedCongNo.conNo);
      }
    }
  }, [watchCongNo, dsCongNo, setValue]);

  return (
    <Stack spacing={2}>
      <Box>
        <SinhVienSelection control={control} name="sinhVienId" label="Sinh viên" required />
      </Box>

      <Box>
        <ControlledTextField
          control={control}
          name="congNoId"
          label="Chọn khoản công nợ"
          select
          required
          disabled={!watchSinhVien || isLoadingCongNo}
          helperText={isLoadingCongNo ? 'Đang tải dữ liệu...' : 'Chọn đợt thu cần thanh toán'}
        >
          <MenuItem value="">
            <em>-- Chọn khoản thu --</em>
          </MenuItem>
          {dsCongNo.map((item) => (
            <MenuItem key={item.congNoId} value={item.congNoId}>
              {item.hocKy} - Còn nợ: {new Intl.NumberFormat('vi-VN').format(item.conNo)}đ (Hạn:{' '}
              {item.hanNop ? new Date(item.hanNop).toLocaleDateString('vi-VN') : 'N/A'})
            </MenuItem>
          ))}
        </ControlledTextField>
      </Box>

      <Box>
        <ControlledTextField
          name="soTien"
          control={control}
          label="Số tiền thu (VNĐ)"
          type="number"
          required
        />
      </Box>

      <Box>
        <FilterSelect
          control={control}
          name="hinhThucThanhToan"
          label="Hình thức thanh toán"
          options={[
            { label: 'Tiền mặt', value: 'TienMat' },
            { label: 'Chuyển khoản', value: 'ChuyenKhoan' },
            { label: 'Thẻ tín dụng', value: 'TheTinDung' },
            { label: 'Ví điện tử', value: 'ViDienTu' },
          ]}
          required
        />
      </Box>

      <Box>
        <ControlledTextField
          name="ghiChu"
          control={control}
          label="Ghi chú"
          multiline
          rows={3}
          placeholder="Nhập nội dung thu..."
        />
      </Box>

      {dsCongNo.length === 0 && watchSinhVien && !isLoadingCongNo && (
        <Typography color="warning.main" variant="caption" sx={{ fontStyle: 'italic', mt: 1 }}>
          Sinh viên này hiện không có khoản nợ nào cần đóng.
        </Typography>
      )}
    </Stack>
  );
};
