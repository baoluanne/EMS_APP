import { LoaiPhong, Option } from '../types';

export const FILTER_CONFIG = {
  LoaiPhong: {
    key: 'idLoaiPhong',
    queryKey: 'LoaiPhong',
    label: 'Loại phòng',
    mapper: (data: LoaiPhong[]): Option[] =>
      data.map((item) => ({ label: item.maLoaiPhong, value: item.id! })),
  },
};
