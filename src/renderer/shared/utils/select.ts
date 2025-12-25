export const toOptions = <T>(
  records: T[],
  options: {
    labelKey: keyof T;
    valueKey: keyof T;
  },
) => {
  const labelKey = options?.labelKey;
  const valueKey = options?.valueKey;

  return (records || [])
    .filter((item) => !!item[valueKey])
    .map((item) => ({
      label: `${item[labelKey]}` || '[Rỗng]',
      value: `${item[valueKey]}`,
    }));
};
