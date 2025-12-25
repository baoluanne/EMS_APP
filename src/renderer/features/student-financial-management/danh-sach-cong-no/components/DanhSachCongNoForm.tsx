import { useEffect, useState } from 'react';
import { Button, IconButton, Typography, TextField, MenuItem, Box, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFormContext, useWatch } from 'react-hook-form';
import axios from 'axios';

import { ControlledTextField } from '@renderer/components/controlled-fields';
import ControlledDatePicker from '@renderer/components/controlled-fields/ControlledDatePicker';
import { NamHocHocKySelection } from '@renderer/components/selections/NamHocHocKySelection';
import { SinhVienSelection } from '@renderer/components/selections/SinhVienSelection';
import { ChiTietKhoanThuDto } from '@renderer/features/student-financial-management/danh-sach-cong-no/type';

interface LoaiKhoanThu {
  id?: string;
  tenLoaiKhoanThu: string;
}

interface DanhSachCongNoFormProps {
  selectedStudent: any;
  setSelectedStudent: (val: any) => void;
  selectedHocKy: any;
  setSelectedHocKy: (val: any) => void;
  selectedHanNop: Date | null;
  setSelectedHanNop: (date: Date | null) => void;
  listChiTiet: ChiTietKhoanThuDto[];
  setListChiTiet: (list: ChiTietKhoanThuDto[]) => void;
  // FIX: Xóa isAddMode khỏi interface
}

export const DanhSachCongNoForm = ({
  setSelectedStudent,
  setSelectedHocKy,
  setSelectedHanNop,
  listChiTiet,
  setListChiTiet,
  // FIX: Xóa isAddMode khỏi destructuring
}: DanhSachCongNoFormProps) => {
  const { control } = useFormContext();
  const [loaiKhoanThuOptions, setLoaiKhoanThuOptions] = useState<LoaiKhoanThu[]>([]);

  const watchSinhVien = useWatch({ control, name: 'sinhVienId' });
  const watchHocKy = useWatch({ control, name: 'namHocHocKyId' });
  const watchHanNop = useWatch({ control, name: 'hanNop' });

  useEffect(() => {
    const fetchLoaiKhoanThu = async () => {
      try {
        const response = await axios.get('http://localhost:5031/api/LoaiKhoanThu');
        const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
        setLoaiKhoanThuOptions(data);
      } catch (error) {
        console.error('Lỗi kết nối:', error);
      }
    };
    fetchLoaiKhoanThu();
  }, []);

  useEffect(() => {
    if (watchSinhVien) {
      setSelectedStudent((prev: any) => ({ ...prev, id: watchSinhVien }));
    } else {
      setSelectedStudent(null);
    }
  }, [watchSinhVien, setSelectedStudent]);

  useEffect(() => {
    if (watchHocKy) {
      setSelectedHocKy((prev: any) => ({ ...prev, id: watchHocKy }));
    } else {
      setSelectedHocKy(null);
    }
  }, [watchHocKy, setSelectedHocKy]);

  useEffect(() => {
    if (watchHanNop) {
      setSelectedHanNop(watchHanNop);
    } else {
      setSelectedHanNop(null);
    }
  }, [watchHanNop, setSelectedHanNop]);

  const handleAddLine = () => {
    setListChiTiet([...listChiTiet, { loaiKhoanThuId: '', soTien: 0, ghiChu: '' }]);
  };

  const handleRemoveLine = (index: number) => {
    const newList = [...listChiTiet];
    newList.splice(index, 1);
    setListChiTiet(newList);
  };

  const handleUpdateLine = (index: number, field: keyof ChiTietKhoanThuDto, value: any) => {
    const newList = [...listChiTiet];
    newList[index] = { ...newList[index], [field]: value };
    setListChiTiet(newList);
  };

  return (
    <Stack spacing={2}>
      <Box>
        <SinhVienSelection control={control} name="sinhVienId" required />
      </Box>

      <Box>
        <NamHocHocKySelection control={control} name="namHocHocKyId" required />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: '0 0 50%' }}>
          <ControlledDatePicker name="hanNop" control={control} label="Hạn nộp" required />
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            mb: 1,
          }}
        >
          <Typography variant="h6">Chi tiết khoản thu *</Typography>
          <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={handleAddLine}>
            Thêm dòng
          </Button>
        </Box>

        {listChiTiet.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 0.75fr 1fr 60px',
              gap: 1,
              mb: 1,
              p: 1,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              alignItems: 'center',
            }}
          >
            <TextField
              select
              fullWidth
              size="small"
              label="Loại khoản thu"
              value={item.loaiKhoanThuId}
              onChange={(e) => handleUpdateLine(index, 'loaiKhoanThuId', e.target.value)}
            >
              {loaiKhoanThuOptions.map((opt) => (
                <MenuItem key={opt.id} value={opt.id}>
                  {opt.tenLoaiKhoanThu}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              size="small"
              label="Số tiền"
              type="number"
              value={item.soTien}
              onChange={(e) => handleUpdateLine(index, 'soTien', Number(e.target.value))}
            />
            <TextField
              fullWidth
              size="small"
              label="Ghi chú"
              value={item.ghiChu}
              onChange={(e) => handleUpdateLine(index, 'ghiChu', e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton color="error" onClick={() => handleRemoveLine(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}

        {listChiTiet.length === 0 && (
          <Typography color="error" variant="caption" sx={{ fontStyle: 'italic' }}>
            Vui lòng thêm ít nhất một khoản thu
          </Typography>
        )}
      </Box>

      <Box>
        <ControlledTextField
          name="ghiChu"
          control={control}
          label="Ghi chú chung"
          multiline
          rows={2}
        />
      </Box>
    </Stack>
  );
};
