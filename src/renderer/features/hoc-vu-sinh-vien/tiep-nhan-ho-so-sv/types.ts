import { ThongTinSinhVienHoSoType, TiepNhanHoSoSVType } from './validations';

export const defaultTiepNhanHoSoSVState: TiepNhanHoSoSVType = {
  idSinhVien: null,
  maVach: null,
  congNoHocPhi: null,
  khoanThuKhac: null,
  soBanIn: null,
  inBienNhan: false,
  xemIn: false,
  isTiepNhan: false,
};

export const defaultThongTinSinhVienHoSoState: ThongTinSinhVienHoSoType = {
  idSinhVien: null,
  maSinhVien: '',
  hoTen: null,
  ngaySinh: null,
  gioiTinh: undefined,
  idKhoaHoc: null,
  idNganh: null,
  idBacDaoTao: null,
  idLoaiDaoTao: null,
  lopHoc: null,
  trangThai: undefined,
  anhSinhVienUrl: null,
};
