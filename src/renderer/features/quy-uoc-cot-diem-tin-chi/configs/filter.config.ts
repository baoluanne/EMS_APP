import { KieuLamTron, Option } from '@renderer/shared/types';
import { KieuMonHoc } from '@renderer/shared/types/kieu-mon-hoc.types';
import { QuyCheTinChi } from '@renderer/shared/types/quy-che-tin-chi.types';
import { quyUocTCRadios, trangThaiQuyUocCotDiemTCRadios } from './radio.config';

export const QuyUocCotDiemTinChiFilters = [
  {
    key: 'idQuyChe_TinChi',
    queryKey: 'QuyChe_TinChi_',
    label: 'Quy chế',
    mapper: (data: QuyCheTinChi[]): Option[] =>
      data.map((item) => ({ label: item.quyCheHocVu?.tenQuyChe ?? '', value: item.id! })),
  },
  {
    key: 'idKieuMon',
    queryKey: 'KieuMonHoc',
    label: 'Kiểu môn',
    mapper: (data: KieuMonHoc[]): Option[] =>
      data.map((item) => ({ label: item.tenKieuMonHoc, value: item.id! })),
  },
  {
    key: 'idKieuLamTron',
    queryKey: 'KieuLamTron',
    label: 'Kiểu Làm Tròn',
    mapper: (data: KieuLamTron[]): Option[] =>
      data.map((item) => ({ label: item.tenKieuLamTron, value: item.id! })),
  },
  {
    key: 'idTrangThai',
    queryKey: 'KieuLamTron',
    label: 'Trạng Thái',
    mapper: (): Option[] =>
      trangThaiQuyUocCotDiemTCRadios.map((item) => ({ label: item.label, value: item.value! })),
  },
  {
    key: 'locTheoQuyUoc',
    queryKey: 'KieuLamTron',
    label: 'Lọc theo quy ước',
    mapper: (): Option[] =>
      quyUocTCRadios.map((item) => ({ label: item.label, value: item.value! })),
  },
];

export const quyUocCotDiemTienChiDefaultFilters = {
  idQuyChe: undefined,
  idKieuMon: undefined,
  idKieuLamTron: undefined,
  quyUoc: undefined,
};
