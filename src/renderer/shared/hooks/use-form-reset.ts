import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export const useFormReset = <T extends FieldValues>(form: UseFormReturn<T>) => {
  const { getValues, setValue } = form;
  const fields = Object.keys(getValues());

  return (newValues: Partial<T> = {}) =>
    fields.forEach((field) => {
      if (newValues[field]) {
        setValue(field as Path<T>, (newValues[field as keyof T] as any) ?? '');
      }
    });
};
