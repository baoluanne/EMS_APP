import { ControlledTextField } from '@renderer/components/controlled-fields';
import { FilterDrawerBottom } from '@renderer/components/modals';
import { useForm } from 'react-hook-form';

type Props = {
  onApply: (filters: { keyword: string }) => void;
};

export const Filters = ({ onApply }: Props) => {
  const filterMethods = useForm<{ keyword: string }>({
    defaultValues: { keyword: '' },
  });
  const { control } = filterMethods;
  const handleClear = () => {
    filterMethods.reset({ keyword: '' });
  };
  return (
    <FilterDrawerBottom<{ keyword: string }>
      onApply={onApply}
      onClear={handleClear}
      methods={filterMethods}
    >
      <ControlledTextField control={control} name="keyword" label="Tìm kiếm" />
    </FilterDrawerBottom>
  );
};
