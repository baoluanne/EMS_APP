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
  gioiTinh?: number | string;
}

const dummySchema = z.object({});

export const PhongSelection = ({
  control,
  name,
  label = 'Phòng',
  required = false,
  disabled = false,
  toaNhaId,
  gioiTinh,
}: Props) => {
  const genderParam =
    gioiTinh !== undefined && gioiTinh !== null && gioiTinh !== '' ? gioiTinh : '';

  const { data, isRefetching } = useCrudPaginationModal({
    entity: 'PhongKtx',
    endpoint: `pagination?Gender=${genderParam}`,
    schema: dummySchema,
    defaultValues: {
      pageSize: 100,
      id: undefined,
      maPhong: undefined,
    },
  });

  const options = useMemo(() => {
    const listData: any[] = (data as any)?.result || (data as any)?.data || [];

    let filteredList = listData;
    if (toaNhaId) {
      filteredList = listData.filter(
        (item) => item.toaNhaId === toaNhaId || item.idToaNha === toaNhaId,
      );
    }

    return filteredList.map((item) => {
      const tenToaNha = item.tang?.toaNha?.tenToaNha || item.toaNha?.tenToaNha || '';
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
