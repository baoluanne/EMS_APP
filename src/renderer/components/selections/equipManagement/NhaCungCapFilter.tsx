import { useMemo } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { Control } from 'react-hook-form';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { nhaCungCapSchema } from '@renderer/features/equip-management/nha-cung-cap-thiet-bi/validation';
import { FilterSelect } from '@renderer/components/fields';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const NhaCungCapSelection = ({
  control,
  name,
  label = 'Nhà cung cấp',
  required = false,
  disabled = false,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'NhaCungCap',
    schema: nhaCungCapSchema,
    defaultValues: {
      id: undefined,
      tenNhaCungCap: undefined,
      dienThoai: undefined,
      email: undefined,
      diaChi: undefined,
      ghiChu: undefined,
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
      label: item.tenNhaCungCap,
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
