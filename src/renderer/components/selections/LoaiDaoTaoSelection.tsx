import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { FC } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';
import { toOptions } from '@renderer/shared/utils/select';
import { DanhMucLoaiHinhDaoTao } from '@renderer/features/danh-muc-loai-hinh-dao-tao';

interface LoaiDaoTaoSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  disabled?: boolean;
}

export const LoaiDaoTaoSelection: FC<LoaiDaoTaoSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  disabled,
}) => {
  const { data } = useListQuery<DanhMucLoaiHinhDaoTao[]>('LoaiDaoTao');
  return (
    <Stack flex={1}>
      <FilterSelect
        label={`Loại đào tạo${required ? '*' : ''}`}
        options={toOptions(data || [], {
          labelKey: 'tenLoaiDaoTao',
          valueKey: 'id',
        })}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
        required={required}
        disabled={disabled}
      />
    </Stack>
  );
};
