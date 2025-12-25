import { PageKeys } from './enums';
import { NavigatorTab, PageKeyType, PagesConfig } from './types';

const PAGES_CONFIG: PagesConfig = {
  [PageKeys.XacMinh2Buoc]: {
    path: '/xac-minh-2-buoc',
  },
  [PageKeys.DanhSachMonHoc]: {
    path: '/danh-sach-mon-hoc',
    label: 'Danh sách môn học',
  },
  [PageKeys.MonHocBacDaoTao]: {
    path: '/mon-hoc-bac-dao-tao',
    label: 'Môn học - Bậc đào tạo',
  },
  [PageKeys.QuyUocCotDiemTinChi]: {
    path: '/quy-uoc-cot-diem-tin-chi',
    label: 'Quy ước cột điểm - Tín chỉ',
  },
  [PageKeys.QuyUocCotDiemNienChe]: {
    path: '/quy-uoc-cot-diem-nien-che',
    label: 'Quy ước cột điểm - Niên chế',
  },
  [PageKeys.QuanLyLopHocPhan]: {
    path: '/quan-ly-lop-hoc-phan',
    label: 'Quản lý lớp học phần',
  },
  [PageKeys.QuanLyQuyUocCachTinhDiemMonHoc]: {
    path: '/quan-ly-quy-uoc-cach-tinh-diem-mon-hoc',
    label: 'Quản lý quy ước cách tính điểm môn học',
  },
  [PageKeys.QuanLyQuyUocCotDiemLopHocPhan]: {
    path: '/quan-ly-quy-uoc-cot-diem-lop-hoc-phan',
    label: 'Quản lý quy ước cột điểm lớp học phần',
  },
  [PageKeys.ChuongTrinhKhungTinChi]: {
    path: '/chuong-trinh-khung-tin-chi',
    label: 'Chương trình khung - Tín chỉ',
  },
  [PageKeys.LapChuongTrinhKhungTinChi]: {
    path: '/lap-chuong-trinh-khung-tin-chi',
    label: 'Lập chương trình khung - Tín chỉ',
  },
  [PageKeys.QuanLyChuongTrinhKhungTinChi]: {
    path: '/quan-ly-chuong-trinh-khung-tin-chi',
    label: 'Quản lý chương trình khung - Tín chỉ',
  },
  [PageKeys.QuanLyChuongTrinhKhungNienChe]: {
    path: '/quan-ly-chuong-trinh-khung-nien-che',
    label: 'Quản lý chương trình khung - Niên chế',
  },
  [PageKeys.LapChuongTrinhKhungNienChe]: {
    path: '/lap-chuong-trinh-khung-nien-che',
    label: 'Lập chương trình khung - Niên chế',
  },
  [PageKeys.ThoiGianDaoTao]: {
    path: '/thoi-gian-dao-tao',
    label: 'Thời gian đào tạo',
  },
  [PageKeys.KhoaChuongTrinhKhung]: {
    path: '/khoa-chuong-trinh-khung',
    label: 'Khóa chương trình khung',
  },
  [PageKeys.PhanMonChoLopHoc]: {
    path: '/phan-mon-cho-lop-hoc',
    label: 'Phân môn cho lớp học',
  },
  [PageKeys.XemPhanMonLopHoc]: {
    path: '/xem-phan-mon-lop-hoc',
    label: 'Xem phân môn lớp học',
  },
  [PageKeys.ChuongTrinhDaoTaoLopHocMonHoc]: {
    path: '/chuong-trinh-dao-tao-lop-hoc-mon-hoc',
    label: 'Chương trình đào tạo lớp học - Môn học',
  },
  [PageKeys.KeHoachDaoTaoTinChi]: {
    path: '/ke-hoach-dao-tao-tin-chi',
    label: 'Kế hoạch đào tạo - Tín chỉ',
  },
  [PageKeys.KeHoachDaoTaoNienChe]: {
    path: '/ke-hoach-dao-tao-nien-che',
    label: 'Kế hoạch đào tạo - Niên chế',
  },
  [PageKeys.QuanLyGiangVien]: {
    path: '/quan-ly-giang-vien',
    label: 'Quản lý giảng viên',
  },
  [PageKeys.LoaiChungChi]: {
    path: '/loai-chung-chi',
    label: 'Loại chứng chỉ',
  },
  [PageKeys.ChungChi]: {
    path: '/chung-chi',
    label: 'Chứng chỉ',
  },
  [PageKeys.DanhMucKhoa]: {
    path: '/danh-muc-khoa',
    label: 'Danh mục khoa',
  },
  [PageKeys.ChuanDauRa]: {
    path: '/chuan-dau-ra',
    label: 'Chuẩn đầu ra',
  },
  [PageKeys.QuyDinhChuanDauRaBoSung]: {
    path: '/quy-dinh-chuan-dau-ra-bo-sung',
    label: 'Quy định chuẩn đầu ra bổ sung',
  },
  [PageKeys.QuyCheHocVu]: {
    path: '/quy-che-hoc-vu',
    label: 'Quy chế học vụ',
  },
  [PageKeys.DanhMucHocBong]: {
    path: 'danh-muc-hoc-bong',
    label: 'Danh Mục Học Bổng',
  },
  [PageKeys.ThietLapQuyCheTinChi]: {
    path: '/thiet-lap-quy-che-tin-chi',
    label: 'Thiết lập quy chế - Tín chỉ',
  },

  [PageKeys.LyDoXinPhong]: {
    path: '/ly-do-xin-phong',
    label: 'Lý do xin phòng',
  },
  [PageKeys.DiaDiemPhong]: {
    path: '/dia-diem-phong',
    label: 'Địa điểm phòng',
  },
  [PageKeys.DayNha]: {
    path: '/day-phong',
    label: 'Dãy phòng',
  },
  [PageKeys.ApDungQuyCheHocVu]: {
    path: '/ap-dung-quy-che-hoc-vu',
    label: 'Áp dụng quy chế học vụ',
  },
  [PageKeys.TieuChuanXetDanhHieu]: {
    path: '/tieu-chuan-xet-danh-hieu',
    label: 'Tiêu chuẩn xét danh hiệu',
  },
  [PageKeys.TieuChuanXetHocBong]: {
    path: '/tieu-chuan-xet-hoc-bong',
    label: 'Tiêu chuẩn xét học bổng',
  },
  [PageKeys.ThietLapQuyCheNienChe]: {
    path: '/thiet-lap-quy-che-nien-che',
    label: 'Thiết lập quy chế - Niên chế',
  },
  [PageKeys.HinhThucXuLyViPhamViCheThi]: {
    path: '/hinh-thuc-xu-ly-vi-pham-vi-che-thi',
    label: 'Hình thức xử lý vi phạm vi chế thi',
  },
  [PageKeys.KhoiKienThuc]: {
    path: '/khoi-kien-thuc',
    label: 'Khối kiến thức',
  },
  [PageKeys.QuyCheRenLuyenKhenThuong]: {
    path: '/quy-che-ren-luyen-khen-thuong',
    label: 'Quy chế rèn luyện - Khen thưởng',
  },
  [PageKeys.PhongHoc]: {
    path: '/phong-hoc',
    label: 'Phòng học',
  },
  [PageKeys.QuyCheRenLuuyenViPham]: {
    path: '/quy-che-ren-luyen-vi-pham',
    label: 'Quy chế rèn luyện - Vi phạm',
  },
  [PageKeys.QuyCheRenLuyenPhanLoaiViPham]: {
    path: '/quy-che-ren-luyen-phan-loai-vi-pham',
    label: 'Quy chế rèn luyện - Phân loại vi phạm',
  },
  [PageKeys.DanhMucLoaiHinhDaoTao]: {
    path: '/danh-muc-loai-hinh-dao-tao',
    label: 'Danh mục loại hình đào tạo',
  },
} as const;

export const ROUTES_CONFIG = Object.fromEntries(
  Object.entries(PAGES_CONFIG).map(([key, value]) => [key, value.path]),
) as Record<PageKeyType, string>;

export const AUTH_ROUTE_KEYS: PageKeyType[] = [PageKeys.XacMinh2Buoc] as const;

export const AUTH_ROUTES_CONFIG = Object.fromEntries(
  Object.entries(ROUTES_CONFIG).filter(([key]) => AUTH_ROUTE_KEYS.includes(key as PageKeyType)),
) as Record<PageKeyType, string>;

export const PROTECTED_ROUTES_CONFIG = Object.fromEntries(
  Object.entries(ROUTES_CONFIG).filter(([key]) => !AUTH_ROUTE_KEYS.includes(key as PageKeyType)),
) as Record<PageKeyType, string>;

export const TABS_CONFIG = Object.fromEntries(
  Object.entries(PAGES_CONFIG)
    .filter(([, value]) => value.label)
    .map(([key, value]) => [key, { ...value, id: value.path, label: value.label! }]),
) as Record<PageKeyType, NavigatorTab>;
