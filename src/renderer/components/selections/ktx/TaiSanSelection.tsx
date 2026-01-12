import { useMemo } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { Control } from 'react-hook-form';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { FilterSelect } from '@renderer/components/fields';
import { z } from 'zod';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  phongKtxId?: string;
}

const dummySchema = z.object({});

export const TaiSanSelection = ({
  control,
  name,
  label = 'Tài sản KTX',
  required = false,
  disabled = false,
  phongKtxId,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'TaiSanKtx',
    schema: dummySchema,
    defaultValues: {},
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

    if (phongKtxId) {
      list = list.filter((item) => item.phongKtxId === phongKtxId);
    }

    return list.map((item) => ({
      label: `${item.tenTaiSan} (${item.maTaiSan})`,
      value: item.id?.toString() || '',
    }));
  }, [data, phongKtxId]);

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
      disabled={disabled || !phongKtxId}
    />
  );
};
