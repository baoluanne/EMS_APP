export enum DonViTinh {
  VND = 'VND',
  USD = 'USD',
}

export const DonViTinhOptions = [
  { value: DonViTinh.VND, label: 'VND' },
  { value: DonViTinh.USD, label: 'USD' },
];

export const parseDonViTinh = (value?: number | string | null) =>
  typeof value === 'number' ? DonViTinhOptions[value].label : value;
