import { Stack } from '@mui/material';
import { useListQuery } from '@renderer/shared/queries';
import { Option, QuyCheHocVu } from '@renderer/shared/types';
import { FC, useEffect, useMemo } from 'react';
import { Control, useFormContext, useWatch } from 'react-hook-form';
import { FilterSelect } from '../fields';

interface QuyCheSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
}

type QuyCheItem = { id: string; quyCheHocVu: QuyCheHocVu };

export const QuyCheSelection: FC<QuyCheSelectionProps> = ({
  value,
  onChange,
  name = 'idQuyCheTC',
  control,
  labelWidth,
  required,
  label = 'Quy chế',
}) => {
  const { data: tinChiList } = useListQuery<QuyCheItem[]>('QuyChe_TinChi_');
  const { data: nienCheList } = useListQuery<QuyCheItem[]>('QuyChe_NienChe_');

  const watchedValue = useWatch({ control, name });
  const { setValue } = useFormContext();

  const formatOptions = (items: QuyCheItem[] = [], isTinChi = false): Option[] =>
    items.map(({ id, quyCheHocVu }) => ({
      label: quyCheHocVu.tenQuyChe,
      value: id,
      fullOption: { id, quyCheHocVu, isQuyCheTinChi: isTinChi },
    }));

  const options = useMemo(
    () => [...formatOptions(tinChiList, true), ...formatOptions(nienCheList, false)],
    [tinChiList, nienCheList],
  );

  useEffect(() => {
    const selected = options.find((opt) => opt.value === watchedValue)?.fullOption;

    if (selected) {
      const [primaryField, secondaryField] = selected.isQuyCheTinChi
        ? ['idQuyCheTC', 'idQuyCheNC']
        : ['idQuyCheNC', 'idQuyCheTC'];

      setValue(primaryField, selected.id);
      setValue(secondaryField, undefined);
    }
  }, [watchedValue, options, setValue]);

  return (
    <Stack flex={1}>
      <FilterSelect
        label={`${label}${required ? '*' : ''}`}
        options={options}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        name={name}
        control={control}
        labelWidth={labelWidth}
        required={required}
      />
    </Stack>
  );
};
