import { Stack } from '@mui/material';
import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const DieuKienDuThiKetThucMonForm = () => {
  const { control } = useFormContext();

  return (
    <HorizontalFilterCollapse title="Điều kiện dự thi kết thúc môn">
      <Stack gap={2.5}>
        <Stack gap={1}>
          <Stack direction="row" gap={2}>
            <ControlledCheckbox
              control={control}
              label="Đã đóng học phí"
              name="dkdT_DaDongHP"
              containerSx={{ flex: 0 }}
              labelSx={{ width: 120 }}
            />
            <ControlledCheckbox
              control={control}
              label="ĐTB thường kỳ >="
              name="dkdT_IsDiemTBThuongKy"
              containerSx={{ flex: 0 }}
              labelSx={{ width: 135 }}
            />
            <ControlledCheckbox
              control={control}
              label="Điểm thường xuyên >="
              name="dkdT_IsDiemTBThuongXuyen"
              containerSx={{ flex: 0 }}
              labelSx={{ width: 175 }}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <ControlledTextField
              control={control}
              label="ĐTB thường kỳ >="
              name="dkdT_DiemTBThuongKy"
              type="number"
            />
            <ControlledTextField
              control={control}
              label="Điểm thường xuyên >="
              name="dkdT_DiemTBThuongXuyen"
              type="number"
            />
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" gap={2}>
            <ControlledCheckbox
              control={control}
              label="Điểm giữa kỳ >="
              name="dkdT_IsDiemGiuaKy"
              containerSx={{ flex: 0 }}
              labelSx={{ width: 120 }}
            />
            <ControlledCheckbox
              control={control}
              label="Điểm tiểu luận >="
              name="dkdT_IsDiemTieuLuan"
              containerSx={{ flex: 0 }}
              labelSx={{ width: 135 }}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <ControlledTextField
              control={control}
              label="Điểm giữa kỳ >="
              name="dkdT_DiemGiuaKy"
              type="number"
            />
            <ControlledTextField
              control={control}
              label="Điểm tiểu luận >="
              name="dkdT_DiemTieuLuan"
              type="number"
            />
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" gap={2}>
            <ControlledCheckbox
              control={control}
              label="Vắng không quá"
              name="dkdT_IsKhongVangQua"
              containerSx={{ flex: 0 }}
              labelSx={{ width: 120 }}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <ControlledTextField
              control={control}
              label="%Tổng vắng"
              name="dkdT_PTTongVang"
              type="number"
            />
            <ControlledTextField
              control={control}
              label="%Lý thuyết"
              name="dkdT_PTLyThuyet"
              type="number"
            />
            <ControlledTextField
              control={control}
              label="%Thực hành"
              name="dkdT_PTThucHanh"
              type="number"
            />
          </Stack>
        </Stack>
      </Stack>
    </HorizontalFilterCollapse>
  );
};
