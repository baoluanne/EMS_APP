import {
  BacDaoTao,
  CoSoTaoDao,
  KhoaHoc,
  LoaiDaoTao,
  NganhHoc,
  Option,
} from '@renderer/shared/types';
import { HocKy } from '@renderer/shared/types/hoc-ky.types';
import { ChiTietKhungHocKy_NienChe } from '../validation';

export const keHoachDaoTaoNienCheDefaultFilters = {
  idHocKy: undefined,
  idCoSoDaoTao: undefined,
  idKhoaHoc: undefined,
  idBacDaoTao: undefined,
  idLoaiDaoTao: undefined,
  idNganhHoc: undefined,
  hocKy: undefined,
};

export const KeHoachDaoTao_NienCheFilters = [
  {
    key: 'idHocKy',
    queryKey: 'HocKy',
    label: 'Đợt',
    mapper: (data: HocKy[]): Option[] =>
      data.map((item) => ({
        label: `${item.tenDot}(${item.namHoc?.namHocValue})`,
        value: item.id!,
      })),
  },
  {
    key: 'chiTietKhungHocKy_NienChe.chuongTrinhKhungNienChe.idCoSoDaoTao',
    queryKey: 'CoSoDaoTao',
    label: 'Cơ sở',
    mapper: (data: CoSoTaoDao[]): Option[] =>
      data.map((item) => ({ label: item.tenCoSo ?? '', value: item.id! })),
  },
  {
    key: 'chiTietKhungHocKy_NienChe.chuongTrinhKhungNienChe.idKhoaHoc',
    queryKey: 'KhoaHoc',
    label: 'Khóa học',
    mapper: (data: KhoaHoc[]): Option[] =>
      data.map((item) => ({ label: item.tenKhoaHoc ?? '', value: item.id! })),
  },
  {
    key: 'chiTietKhungHocKy_NienChe.chuongTrinhKhungNienChe.idBacDaoTao',
    queryKey: 'BacDaoTao',
    label: 'Bậc đào tạo',
    mapper: (data: BacDaoTao[]): Option[] =>
      data.map((item) => ({ label: item.tenBacDaoTao ?? '', value: item.id! })),
  },
  {
    key: 'chiTietKhungHocKy_NienChe.chuongTrinhKhungNienChe.idLoaiDaoTao',
    queryKey: 'LoaiDaoTao',
    label: 'Loại đào tạo',
    mapper: (data: LoaiDaoTao[]): Option[] =>
      data.map((item) => ({ label: item.tenLoaiDaoTao ?? '', value: item.id! })),
  },
  {
    key: 'chiTietKhungHocKy_NienChe.chuongTrinhKhungNienChe.idNganhHoc',
    queryKey: 'NganhHoc',
    label: 'Ngành',
    mapper: (data: NganhHoc[]): Option[] =>
      data.map((item) => ({ label: item.tenNganhHoc ?? '', value: item.id! })),
  },
  {
    key: 'chiTietKhungHocKy_NienChe.hocKy',
    queryKey: 'ChiTietKhungHocKy_NienChe/get-hoc-ky',
    label: 'Học kỳ',
    mapper: (data: ChiTietKhungHocKy_NienChe[]): Option[] =>
      data.map((item) => ({ label: item.hocKy.toString() ?? '', value: item.hocKy.toString()! })),
  },
];
