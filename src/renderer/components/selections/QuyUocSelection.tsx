import { Stack } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import { FilterSelect } from '../fields';
import { Control, useFormContext, useWatch } from 'react-hook-form';
import { useListQuery } from '@renderer/shared/queries';
import { Option } from '@renderer/shared/types';
import { QuyUocCotDiemItem } from '@renderer/features/quan-ly-quy-uoc-cach-tinh-diem-mon-hoc';

interface QuyUocSelectionProps {
  value?: string;
  onChange?: (val: QuyUocCotDiemItem) => void;
  labelWidth?: number;
  name?: string;
  control?: Control<any>;
  required?: boolean;
}

export const QuyUocSelection: FC<QuyUocSelectionProps> = ({
  value,
  onChange,
  labelWidth = 135,
  name = 'idQuyUocCotDiem_TC',
  control,
  required,
}) => {
  const { data: tinChiList } = useListQuery<QuyUocCotDiemItem[]>('QuyUocCotDiem_TC_');
  const { data: nienCheList } = useListQuery<QuyUocCotDiemItem[]>('QuyUocCotDiem_NC_');
  const watchedValue = useWatch({ control, name });
  const { setValue } = useFormContext();
  const formatOptions = (items: QuyUocCotDiemItem[] = [], isTinChi = false): Option[] =>
    items.map(({ id, tenQuyUoc }) => ({
      label: tenQuyUoc,
      value: id,
      fullOption: { id, tenQuyUoc, isQuyUocTinChi: isTinChi },
    }));

  const options = useMemo(
    () => [...formatOptions(tinChiList, true), ...formatOptions(nienCheList, false)],
    [tinChiList, nienCheList],
  );

  useEffect(() => {
    const selected = options.find((opt) => opt.value === watchedValue)?.fullOption;
    if (selected) {
      const [primaryField, secondaryField] = selected.isQuyCheTinChi
        ? ['idQuyUocCotDiem_TC', 'idQuyUocCotDiem_TC']
        : ['idQuyUocCotDiem_NC', 'idQuyUocCotDiem_NC'];
      setValue(primaryField, selected.id);
      setValue(secondaryField, undefined);
    }
  }, [watchedValue, options, setValue]);
  return (
    <Stack flex={1}>
      <FilterSelect
        label="Quy ước"
        options={options}
        value={value}
        onChange={onChange ? (e) => {
          const selectedOption = options.find((opt) => opt.value === e.target.value);
          onChange(selectedOption?.fullOption);
        } : undefined}
        labelWidth={labelWidth}
        name={name}
        control={control}
        required={required}
      />
    </Stack>
  );
};
