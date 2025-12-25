import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { toOptions } from '@renderer/shared/utils/select';
import { FC, useMemo } from 'react';
import { Control } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface QuyetDinhSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  listData?: any[];
}

type QuyetDinhOption = { id: string; soQuyetDinh: string; tenQuyetDinh: string };

export const QuyetDinhSelection: FC<QuyetDinhSelectionProps> = ({
  value,
  onChange,
  name,
  control,
  labelWidth,
  required,
  listData,
}) => {
  const { data: fetchedData } = useListQuery<QuyetDinhOption[]>('QuyetDinh', {
    enabled: !listData,
  });

  const options = useMemo(() => {
    const dataToUse = listData || fetchedData || [];
    const processedData = dataToUse.map((item) => ({
      ...item,
      displayLabel: item.tenQuyetDinh || item.soQuyetDinh,
    }));
    return toOptions(processedData, {
      labelKey: 'displayLabel',
      valueKey: 'id',
    });
  }, [listData, fetchedData]);

  return (
    <Stack>
      <FilterSelect
        label={`Quyết định${required ? '*' : ''}`}
        options={options}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
      />
    </Stack>
  );
};
