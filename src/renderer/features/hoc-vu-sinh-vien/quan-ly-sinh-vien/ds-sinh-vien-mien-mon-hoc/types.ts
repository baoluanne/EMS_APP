import { SinhVienMienMonHocFilter } from './validations';

export const defaultSinhVienMienMonHocFilterValues: SinhVienMienMonHocFilter = {
  id: '',
  idQuyetDinh: '',
  idCoSo: '',
  idKhoaHoc: '',
  idBacDaoTao: '',
  idLoaiDaoTao: '',
  idNganh: '',
  idChuyenNganh: '',
  idLopHoc: '',
  maSinhVien: '',
  hoDem: '',
  ten: '',
  trangThai: '',
  startNgayTao: null,
  endNgayTao: null,
};

export interface SVFilters {
  idSinhVien?: string;
  maSinhVien?: string;
  hoDem?: string;
  ten?: string;
  quyetDinh?: string;
}

export const defaultSVFiltersValues: SVFilters = {
  idSinhVien: '',
  maSinhVien: '',
  hoDem: '',
  ten: '',
};

export interface SinhVienMienMonHocPayload {
  idSinhVien: string;
  idMonHocBacDaoTaos: string[];
  idQuyetDinh: string | null | undefined;
}
export interface NhapSinhVienMienMonHocFormRef {
  getFormDataToSave: () => SinhVienMienMonHocPayload | null;
}
