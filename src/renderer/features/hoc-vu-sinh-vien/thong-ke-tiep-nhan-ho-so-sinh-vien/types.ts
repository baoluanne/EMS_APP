import { AuditableEntity, BaseEntity } from '@renderer/shared/types/base.types';
import { SinhVien } from '@renderer/shared/types/sinh-vien.types';
import { User } from '@renderer/shared/types/user.types';

export interface HoSoSV extends BaseEntity, AuditableEntity {
  maHoSo: string;
  tenHoSo: string;
  loaiHoSo?: number;
  ghiChu?: string | null;
}

export interface TiepNhanHoSoSv extends BaseEntity, AuditableEntity {
  // sinh vien
  idSinhVien: string;
  sinhVien?: SinhVien | null;
  // ho so
  idHoSoSV: string;
  hoSoSV?: HoSoSV | null;

  ghiChu?: string | null;

  idNguoiTiepNhan?: string | null;
  nguoiTiepNhan?: User | null;
  idNguoiXuLy?: string | null;
  nguoiXuLy?: User | null;

  ngayTiepNhan?: string | null;
  ngayXuLy?: string | null;

  trangThai: number; // TrangThaiHoSoEnum: 0 = ChoDuyet, 1 = DaNhan, 2 = TuChoi
  lyDoTuChoi?: string | null;

  inBienNhan?: boolean | null;
  xemIn?: boolean | null;
  soBanIn?: number | null;

  maVach?: string | null;
  congNoHocPhi?: number | null;
  khoanThuKhac?: number | null;
}

export interface ThongKeTiepNhanHoSoSinhVienFilter {
  idCoSo?: string;
  idKhoaHoc?: string;
  idBacDaoTao?: string;
  idLoaiDaoTao?: string;
  idNganhHoc?: string;
  idChuyenNganh?: string;
  idLopHoc?: string;
  maSinhVien?: string;
  hoTen?: string;
  idHoSo?: string;
  idThongKe?: string;
  loaiHoSo?: string;
  trangThaiHoSo: string[];
  ngayTiepNhanHoSoFrom?: Date;
  ngayTiepNhanHoSoTo?: Date;
}
