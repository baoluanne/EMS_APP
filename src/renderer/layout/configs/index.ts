import { TABS_CONFIG } from '@renderer/shared/configs';
import { MainMenuItem } from '@renderer/shared/types/navbar.types';

export const TAB_HEIGHT = 40;

export const navigationConfig: MainMenuItem[] = [
  {
    label: 'Hệ thống',
    submenu: [],
    disable: true,
  },
  {
    label: 'Tuyển sinh',
    submenu: [],
    disable: true,
  },
  {
    label: 'Quản lý đào tạo',
    submenu: [
      {
        label: 'Chương trình khung',
        children: [
          { label: TABS_CONFIG.DanhSachMonHoc.label, tab: TABS_CONFIG.DanhSachMonHoc },
          {
            label: TABS_CONFIG.MonHocBacDaoTao.label,
            tab: TABS_CONFIG.MonHocBacDaoTao,
          },
          // ---
          {
            label: TABS_CONFIG.QuyUocCotDiemTinChi.label,
            tab: TABS_CONFIG.QuyUocCotDiemTinChi,
            hasDivider: true,
          },
          { label: TABS_CONFIG.QuyUocCotDiemNienChe.label, tab: TABS_CONFIG.QuyUocCotDiemNienChe },
          {
            label: 'Quy ước cột điểm mới',
            path: '#',
          },
          {
            label: TABS_CONFIG.QuanLyQuyUocCachTinhDiemMonHoc.label,
            tab: TABS_CONFIG.QuanLyQuyUocCachTinhDiemMonHoc,
          },
          // {
          //   label: TABS_CONFIG.QuanLyQuyUocCotDiemLopHocPhan.label,
          //   tab: TABS_CONFIG.QuanLyQuyUocCotDiemLopHocPhan,
          // },
          // ---
          {
            label: TABS_CONFIG.QuanLyChuongTrinhKhungTinChi.label,
            tab: TABS_CONFIG.QuanLyChuongTrinhKhungTinChi,
            hasDivider: true,
          },
          {
            label: TABS_CONFIG.LapChuongTrinhKhungTinChi.label,
            tab: TABS_CONFIG.LapChuongTrinhKhungTinChi,
            hasDivider: true,
          },
          {
            label: TABS_CONFIG.QuanLyChuongTrinhKhungNienChe.label,
            tab: TABS_CONFIG.QuanLyChuongTrinhKhungNienChe,
          },
          {
            label: TABS_CONFIG.LapChuongTrinhKhungNienChe.label,
            tab: TABS_CONFIG.LapChuongTrinhKhungNienChe,
            hasDivider: true,
          },
          // ---
          {
            label: TABS_CONFIG.KhoaChuongTrinhKhung.label,
            tab: TABS_CONFIG.KhoaChuongTrinhKhung,
            hasDivider: true,
          },
          // ---
          {
            label: TABS_CONFIG.PhanMonChoLopHoc.label,
            tab: TABS_CONFIG.PhanMonChoLopHoc,
            hasDivider: true,
          },
          {
            label: TABS_CONFIG.XemPhanMonLopHoc.label,
            tab: TABS_CONFIG.XemPhanMonLopHoc,
          },
          // ---
          {
            label: TABS_CONFIG.ChuongTrinhDaoTaoLopHocMonHoc.label,
            tab: TABS_CONFIG.ChuongTrinhDaoTaoLopHocMonHoc,
          },
          {
            label: TABS_CONFIG.ThoiGianDaoTao.label,
            tab: TABS_CONFIG.ThoiGianDaoTao,
          },
        ],
      },
      {
        label: 'Tiến độ đào tạo',
        children: [
          { label: TABS_CONFIG.KeHoachDaoTaoTinChi.label, tab: TABS_CONFIG.KeHoachDaoTaoTinChi },
          { label: TABS_CONFIG.KeHoachDaoTaoNienChe.label, tab: TABS_CONFIG.KeHoachDaoTaoNienChe },
        ],
      },

      {
        label: 'Quy chế học vụ - Khen thưởng',
        children: [
          { label: TABS_CONFIG.QuyCheHocVu.label, tab: TABS_CONFIG.QuyCheHocVu },
          { label: TABS_CONFIG.ThietLapQuyCheTinChi.label, tab: TABS_CONFIG.ThietLapQuyCheTinChi },
          { label: 'Thiết lập quy chế - Niên chế', tab: TABS_CONFIG.ThietLapQuyCheNienChe },
          { label: 'Áp dụng quy chế học vụ', tab: TABS_CONFIG.ApDungQuyCheHocVu, hasDivider: true },
          { label: 'Danh mục học bổng', tab: TABS_CONFIG.DanhMucHocBong, hasDivider: true },
          {
            label: 'Tiêu chuẩn xét học bổng',
            tab: TABS_CONFIG.TieuChuanXetHocBong,
            hasDivider: true,
          },
          { label: 'Tiêu chuẩn xét danh hiệu', tab: TABS_CONFIG.TieuChuanXetDanhHieu },
        ],
      },
      {
        label: 'Quy định chuẩn đầu ra',
        children: [
          { label: TABS_CONFIG.LoaiChungChi.label, tab: TABS_CONFIG.LoaiChungChi },
          { label: TABS_CONFIG.ChungChi.label, tab: TABS_CONFIG.ChungChi },
          { label: 'Quy định chuẩn đầu ra', tab: TABS_CONFIG.ChuanDauRa, hasDivider: true },
          { label: 'Quy định chuẩn đầu ra bổ sung', tab: TABS_CONFIG.QuyDinhChuanDauRaBoSung },
        ],
      },
      {
        label: 'Quy định rèn luyện - Kỷ luật',
        children: [
          {
            label: 'Quy chế rèn luyện - Phân loại vi phạm',
            tab: TABS_CONFIG.QuyCheRenLuyenPhanLoaiViPham,
          },
          { label: 'Quy chế rèn luyện - Vi phạm', tab: TABS_CONFIG.QuyCheRenLuuyenViPham },
          { label: 'Quy chế rèn luyện - Khen thưởng', tab: TABS_CONFIG.QuyCheRenLuyenKhenThuong },
          {
            label: 'Hình thức xử lý vi phạm quy chế thi',
            tab: TABS_CONFIG.HinhThucXuLyViPhamViCheThi,
          },
        ],
      },
      {
        label: 'Quản lý giảng viên - Phòng học',
        hasDivider: true,
        children: [
          { label: TABS_CONFIG.QuanLyGiangVien.label, tab: TABS_CONFIG.QuanLyGiangVien },
          { label: TABS_CONFIG.DiaDiemPhong.label, tab: TABS_CONFIG.DiaDiemPhong },
          { label: TABS_CONFIG.DayNha.label, tab: TABS_CONFIG.DayNha },
          { label: TABS_CONFIG.PhongHoc.label, tab: TABS_CONFIG.PhongHoc },
          { label: TABS_CONFIG.LyDoXinPhong.label, tab: TABS_CONFIG.LyDoXinPhong },
        ],
      },
    ],
  },
  {
    label: 'Học vụ SV',
    submenu: [],
    disable: true,
  },
  {
    label: 'Tài chính',
    submenu: [],
    disable: true,
  },
  {
    label: 'Trắc nghiệm',
    submenu: [],
    disable: true,
  },
  {
    label: 'Thời khóa biểu',
    submenu: [],
    disable: true,
  },
  {
    label: 'Danh mục',
    submenu: [
      {
        label: 'Danh mục khoa',
        tab: TABS_CONFIG.DanhMucKhoa,
      },
      {
        label: TABS_CONFIG.DanhMucLoaiHinhDaoTao.label,
        tab: TABS_CONFIG.DanhMucLoaiHinhDaoTao,
      },
    ],
    disable: false,
  },
  {
    label: 'Khối kiến thức',
    tab: TABS_CONFIG.KhoiKienThuc,
    disable: false,
    submenu: [],
  },
];
