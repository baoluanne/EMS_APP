import { ControlledSelect } from '@renderer/components/controlled-fields/ControlledSelect';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';

interface Props {
  control: Control<any>;
  name: string;
  label: string;
  disabled?: boolean;
}

export const SinhVienDangOKtxSelection = ({ control, name, label, disabled }: Props) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSinhVien = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5031/api/cu-tru-ktx/pagination', {
          params: { page: 1, pageSize: 1000 },
        });
        const data = response.data.data || [];

        const mappedOptions = data.map((sv: any) => ({
          value: sv.sinhVienId,
          label: `${sv.maSinhVien} - ${sv.hoTen} (${sv.maPhong})`,
        }));
        setOptions(mappedOptions);
      } catch (error) {
        console.error('Lỗi tải danh sách sinh viên:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSinhVien();
  }, []);

  return (
    <ControlledSelect
      control={control}
      name={name}
      label={label}
      options={options}
      disabled={disabled || loading}
    />
  );
};
