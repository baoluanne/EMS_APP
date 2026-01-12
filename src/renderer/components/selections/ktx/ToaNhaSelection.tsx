import { useMemo } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { Control } from 'react-hook-form';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { toaNhaSchema } from '@renderer/features/ktx-management/toa-nha/validation';
import { FilterSelect } from '@renderer/components/fields';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const ToaNhaSelection = ({
  control,
  name,
  label = 'Tòa nhà',
  required = false,
  disabled = false,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'ToaNhaKtx',
    schema: toaNhaSchema,
    defaultValues: {
      id: undefined,
      tenToaNha: undefined,
    },
  });

  const options = useMemo(() => {
    if (!data) return [];

    let list: any[] = [];
    if ('data' in data && Array.isArray(data.data)) {
      list = data.data;
    } else if ('result' in data && Array.isArray(data.result)) {
      list = data.result;
    } else if (Array.isArray(data)) {
      list = data;
    }

    return list.map((item) => ({
      label: item.tenToaNha,
      value: item.id?.toString() || '',
    }));
  }, [data]);

  if (isRefetching) {
    return (
      <Box sx={{ position: 'relative', height: '40px' }}>
        <CircularProgress
          size={24}
          style={{ position: 'absolute', top: '50%', right: '10px', marginTop: -12 }}
        />
      </Box>
    );
  }

  return (
    <FilterSelect
      label={label}
      options={options}
      name={name}
      control={control}
      required={required}
      disabled={disabled}
    />
  );
};
