import { useMemo } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { useCrudPaginationModal } from '@renderer/shared/hooks/use-crud-pagination-modal';
import { FilterSelect } from '@renderer/components/fields';

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  toaNhaId?: string;
}

const dummySchema = z.object({});

export const PhongSelection = ({
  control,
  name,
  label = 'Phòng',
  required = false,
  disabled = false,
  toaNhaId,
}: Props) => {
  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'PhongKtx',
    schema: dummySchema,
    defaultValues: {
      id: undefined,
      maPhong: undefined,
      toaNhaId: undefined,
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

    // Lọc theo tòa nhà nếu có truyền toaNhaId
    if (toaNhaId) {
      list = list.filter((item) => item.toaNhaId === toaNhaId || item.idToaNha === toaNhaId);
    }

    return list.map((item) => {
      const tenToaNha = item.tenToaNha || item.toaNha?.tenToaNha || '';
      return {
        label: `${item.maPhong}${tenToaNha ? ` - ${tenToaNha}` : ''}`,
        value: item.id?.toString() || '',
      };
    });
  }, [data, toaNhaId]);

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
