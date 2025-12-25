import Grid from '@mui/material/Grid';
import {
  ControlledCheckbox,
  ControlledDatePicker,
  ControlledTextField,
} from '@renderer/components/controlled-fields';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export const NamHocForm = () => {
  const { control, setValue } = useFormContext();

  const tuNgay = useWatch({ control, name: 'tuNgay' });
  const denNgay = useWatch({ control, name: 'denNgay' });

  useEffect(() => {
    if (!tuNgay || !denNgay) {
      setValue('soTuan', null, { shouldValidate: true, shouldDirty: true });
      return;
    }

    const start = dayjs(tuNgay).startOf('day');
    const end = dayjs(denNgay).startOf('day');

    // Nếu end trước start -> tự set end = start + 6 (1 tuần)
    if (end.isBefore(start)) {
      const newEnd = start.add(6, 'day');
      const msg = 'Ngày kết thúc nhỏ hơn ngày bắt đầu. Hệ thống tự điều chỉnh để đủ 1 tuần.';
      // Thông báo người dùng
      toast.warn(msg);
      setValue('denNgay', newEnd.toDate(), { shouldDirty: true, shouldValidate: true });
      setValue('soTuan', 1, { shouldDirty: true, shouldValidate: true });
      return;
    }

    // Tính số ngày (bao gồm cả ngày bắt đầu và kết thúc)
    const diffDays = end.diff(start, 'day') + 1;
    const remainder = diffDays % 7;

    if (remainder === 0) {
      // Đã chẵn tuần
      const weeks = Math.floor(diffDays / 7);
      setValue('soTuan', weeks, { shouldDirty: true, shouldValidate: true });
      return;
    }

    // Tìm hướng làm tròn (lên hoặc xuống) dựa trên khoảng cách tới bội 7 gần nhất
    const distDown = remainder; // số ngày cần trừ để xuống bội 7
    const distUp = 7 - remainder; // số ngày cần cộng để lên bội 7

    let weeks = distUp < distDown ? Math.ceil(diffDays / 7) : Math.floor(diffDays / 7);
    if (weeks === 0) weeks = 1; // đảm bảo tối thiểu 1 tuần

    const newEnd = start.add(weeks * 7 - 1, 'day');

    if (!newEnd.isSame(end, 'day')) {
      // Thông báo và set lại denNgay
      const msg = `Khoảng không tròn tuần (tổng ${diffDays} ngày). Hệ thống tự điều chỉnh ngày kết thúc thành ${newEnd.format(
        'DD/MM/YYYY',
      )} để đủ ${weeks} tuần.`;
      toast.warn(msg);
      setValue('denNgay', newEnd.toDate(), { shouldDirty: true, shouldValidate: true });
    }

    setValue('soTuan', weeks, { shouldDirty: true, shouldValidate: true });
  }, [tuNgay, denNgay, setValue]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="namHocValue" label="Năm học" required />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField control={control} name="nienHoc" label="Niên học" required />
      </Grid>

      <Grid size={{ xs: 12, md: 5 }}>
        <ControlledDatePicker control={control} name="tuNgay" label="Từ ngày" />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <ControlledDatePicker control={control} name="denNgay" label="Đến ngày" />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <ControlledTextField
          control={control}
          name="soTuan"
          label="Số tuần"
          type="number"
          disabled
        />
      </Grid>
      <Grid size={{ xs: 12, md: 10 }}>
        <ControlledTextField control={control} name="tenTiengAnh" label="Tên tiếng Anh" />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <ControlledCheckbox control={control} name="isVisible" label="Hiển thị" />
      </Grid>
    </Grid>
  );
};
