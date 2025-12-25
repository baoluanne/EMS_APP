import { Stack, TextField } from '@mui/material';
import { FormDetailsModal } from '@renderer/components/modals';
import { SearchButton } from '@renderer/features/common';
import { useDisclosure } from '@renderer/shared/hooks';
import { LopHoc } from '@renderer/shared/types';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { TimKiemLopHocForm } from './TimLopHocPhanForm';

interface LopHocPhanSelectionProps {
  value?: string;
  onChange?: (val: string) => void;
  name: string;
  control?: Control<any>;
  labelWidth?: number;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  valueType?: 'object' | 'id';
}

export const LopHocPhanSelection: FC<LopHocPhanSelectionProps> = ({
  name,
  control,
  required,
  label,
  valueType = 'id',
}) => {
  const lopHocIdController = useController({ control, name });
  const [value, setValue] = useState('');
  const [currentId, setCurrentId] = useState('');
  const { isOpen: isTimKiemLopHocOpen, toggle: toggleTimKiemLopHoc } = useDisclosure();
  const handleLopHocSelected = (record: LopHoc) => {
    setValue(record.tenLop!);
    const changedValue = valueType === 'id' ? record.id : record;
    lopHocIdController.field.onChange(changedValue);
    setCurrentId(record.id!);
  };

  return (
    <Stack direction={'row'}>
      <TextField
        label={`${label || 'Lớp học phần'}${required ? '*' : ''}`}
        value={value}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: <IconCaretDownFilled size={14} style={{ color: 'gray' }} />,
          },
        }}
        onClick={toggleTimKiemLopHoc}
        size="small"
        sx={{ flex: 1 }}
      />
      <SearchButton onClick={toggleTimKiemLopHoc} />
      {isTimKiemLopHocOpen && (
        <FormDetailsModal title={'Tìm kiếm lớp học phần'} onClose={toggleTimKiemLopHoc}>
          <TimKiemLopHocForm
            onClose={toggleTimKiemLopHoc}
            onSelected={handleLopHocSelected}
            currentId={currentId}
          />
        </FormDetailsModal>
      )}
    </Stack>
  );
};
