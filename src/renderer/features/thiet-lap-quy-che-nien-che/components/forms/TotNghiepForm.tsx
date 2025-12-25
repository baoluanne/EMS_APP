import { HorizontalFilterCollapse } from '@renderer/components/collapses/HorizontalCollapse';
import { ControlledCheckbox } from '@renderer/components/controlled-fields';
import { useFormContext } from 'react-hook-form';

export const TotNghiepForm = () => {
  const { control } = useFormContext();

  return (
    <HorizontalFilterCollapse title="Tốt nghiệp">
      <ControlledCheckbox
        name="dktH_IsAutoCheckDongHP"
        control={control}
        label="Tự động check đã đóng phí khi thi lần đầu"
      />
    </HorizontalFilterCollapse>
  );
};
