import { Lazy } from '@renderer/components/loading';
import { createElement, lazy } from 'react';
import {
  FcBusinessman,
  FcConferenceCall,
  FcCurrencyExchange,
  FcDepartment,
  FcDocument,
  FcFolder,
  FcFullBattery,
  FcGraduationCap,
  FcHome,
  FcIdea,
  FcLibrary,
  FcMenu,
  FcMoneyTransfer,
  FcOrganization,
  FcParallelTasks,
  FcPlanner,
  FcPortraitMode,
  FcQuestions,
  FcReading,
  FcReadingEbook,
  FcRules,
  FcSettings,
  FcSurvey,
} from 'react-icons/fc';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { generateFullPath } from './router-map';

const _appRoutes = [
  {
    label: 'Trang chủ',
    icon: <FcHome />,
    path: 'dashboard',
    Component: Lazy(lazy(() => import('@renderer/pages/Dashboard'))),
    group: 'home',
    disabledPin: true,
  },
  {
    icon: <FcGraduationCap />,
    label: 'Quản lý đào tạo',
    path: 'training-management',
    Component: Lazy(lazy(() => import('@renderer/pages/TrainingManagement'))),
    children: [
      {
        label: 'Chương trình khung',
        icon: <FcReadingEbook />,
        path: 'curriculum-framework',
        Component: Lazy(lazy(() => import('@renderer/pages/CurriculumFramework'))),
        children: [
          {
            label: 'Danh sách môn học',
            icon: <FcReading />,
            path: 'course-list',
            Component: Lazy(lazy(() => import('@renderer/pages/DanhSachMonHoc'))),
          },
          {
            label: 'Môn học - bậc đào tạo',
            icon: <FcGraduationCap />,
            path: 'course-levels',
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/MonHocBacDaoTao'))),
          },
          {
            label: 'Quy ước cột điểm - tín chỉ',
            icon: <FcSurvey />,
            path: 'score-credit-mapping',
            Component: Lazy(lazy(() => import('@renderer/pages/QuyUocCotDiemTinChi'))),
          },
          {
            label: 'Quy ước cột điểm - niên chế',
            icon: <FcSurvey />,
            path: 'grading-rules-annual',
            Component: Lazy(lazy(() => import('@renderer/pages/QuyUocCotDiemNienChe'))),
          },
          // {
          //   label: 'Quy ước cột điểm mới',
          //   icon: <FcSurvey />,
          //   path: 'new-grade-column-rules',
          //   Component: Lazy(lazy(() => import('@renderer/pages/NewGradeColumnRules'))),
          // },
          {
            label: 'QL cách tính điểm môn học',
            icon: <FcSettings />,
            path: 'subject-score-settings',
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/QuanLyQuyUocCachTinhDiemMonHoc'))),
          },
          // {
          //   label: 'QL quy ước cột điểm lớp học phần',
          //   icon: <FcSettings />,
          //   path: 'course-class-score-settings',
          //   Component: Lazy(lazy(() => import('@renderer/pages/QuanLyQuyUocCotDiemLopHocPhan'))),
          // },
          {
            label: 'Quản lý chương trình khung - Tín chỉ',
            icon: <FcLibrary />,
            path: 'credit-training-framework-management',
            Component: Lazy(lazy(() => import('@renderer/pages/QuanLyChuongTrinhKhungTinChi'))),
          },
          {
            label: 'Quản lý chương trình khung - Niên chế',
            icon: <FcLibrary />,
            path: 'annual-framework-management',
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/QuanLyChuongTrinhKhungNienChe'))),
          },
          {
            label: 'Khóa chương trình khung',
            icon: <FcRules />,
            path: 'framework-year',
            Component: Lazy(lazy(() => import('@renderer/pages/KhoaChuongTrinhKhung'))),
          },
          // {
          //   label: 'Phân môn cho lớp học',
          //   icon: <FcSettings />,
          //   path: 'class-subject-mapping',
          //   Component: Lazy(lazy(() => import('@renderer/pages/PhanMonChoLopHoc'))),
          // },
          // {
          //   label: 'Xem phân môn lớp học',
          //   icon: <FcSettings />,
          //   path: 'class-subject-details',
          //   Component: Lazy(lazy(() => import('@renderer/pages/XemPhanMonLopHoc'))),
          // },
          // {
          //   label: 'Chương trình đào tạo lớp học - Môn học',
          //   icon: <FcSettings />,
          //   path: 'class-curriculum-subjects',
          //   Component: Lazy(lazy(() => import('@renderer/pages/ChuongTrinhDaoTaoLopHocMonHoc'))),
          // },
        ],
      },
      {
        label: 'Tiến độ đào tạo',
        icon: <FcPlanner />,
        path: 'training-progress',
        Component: Lazy(lazy(() => import('@renderer/pages/TrainingProgress'))),
        children: [
          {
            label: 'Kế hoạch đào tạo - tín chỉ',
            icon: <FcPlanner />,
            path: 'credit-training-plan',
            Component: Lazy(lazy(() => import('@renderer/pages/KeHoachDaoTaoTinChi'))),
          },
          {
            label: 'Kế hoạch đào tạo - niên chế',
            icon: <FcPlanner />,
            path: 'annual-training-plan',
            Component: Lazy(lazy(() => import('@renderer/pages/KeHoachDaoTaoNienChe'))),
          },
        ],
      },
      {
        label: 'Quy chế học vụ - khen thưởng',
        icon: <FcRules />,
        path: 'student-affairs-rewards',
        Component: Lazy(lazy(() => import('@renderer/pages/StudentAffairsRewards'))),
        children: [
          {
            label: 'Quy chế học vụ',
            icon: <FcRules />,
            path: 'student-affairs-policy',
            Component: Lazy(lazy(() => import('@renderer/pages/QuyCheHocVu'))),
          },
          {
            label: 'Thiết lập quy chế - tín chỉ',
            icon: <FcSettings />,
            path: 'credit-policy-setup',
            Component: Lazy(lazy(() => import('@renderer/pages/ThietLapQuyCheTinChi'))),
          },
          {
            label: 'Thiết lập quy chế - niên chế',
            icon: <FcSettings />,
            path: 'annual-policy-setup',
            Component: Lazy(lazy(() => import('@renderer/pages/ThietLapQuyCheNienChe'))),
          },
          {
            label: 'Áp dụng quy chế học vụ',
            icon: <FcIdea />,
            path: 'student-affairs-policy-implementation',
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/ApDungQuyCheHocVu'))),
          },
          {
            label: 'Danh mục học bổng',
            icon: <FcIdea />,
            path: 'scholarship-catalog',
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucHocBong'))),
          },
          {
            label: 'Tiêu chuẩn xét học bổng',
            icon: <FcIdea />,
            path: 'scholarship-criteria',
            Component: Lazy(lazy(() => import('@renderer/pages/TieuChuanXetHocBong'))),
          },
          {
            label: 'Tiêu chuẩn xét danh hiệu',
            icon: <FcIdea />,
            path: 'title-award-criteria',
            Component: Lazy(lazy(() => import('@renderer/pages/TieuChuanXetDanhHieu'))),
          },
        ],
      },
      {
        label: 'Quy định chuẩn đầu ra',
        icon: <FcOrganization />,
        path: 'graduation-standards',
        Component: Lazy(lazy(() => import('@renderer/pages/GraduationStandards'))),
        children: [
          {
            label: 'Loại chứng chỉ',
            icon: <FcSurvey />,
            path: 'certification-categories',
            Component: Lazy(lazy(() => import('@renderer/pages/LoaiChungChi'))),
          },
          {
            label: 'Chứng chỉ',
            icon: <FcSurvey />,
            path: 'certificate',
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/ChungChi'))),
          },
          {
            label: 'Quy định chuẩn đầu ra',
            icon: <FcRules />,
            path: 'output-standards',
            Component: Lazy(lazy(() => import('@renderer/pages/ChuanDauRa'))),
          },
          {
            label: 'Quy định chuẩn đầu ra bổ sung',
            icon: <FcRules />,
            path: 'additional-output-standards',
            Component: Lazy(lazy(() => import('@renderer/pages/QuyDinhChuanDauRaBoSung'))),
          },
        ],
      },
      {
        label: 'Quy định rèn luyện - Kỷ luật',
        icon: <FcConferenceCall />,
        path: 'discipline-regulations',
        Component: Lazy(lazy(() => import('@renderer/pages/DisciplineRegulations'))),
        children: [
          {
            label: 'Quy chế rèn luyện - Phân loại vi phạm',
            icon: <FcRules />,
            path: 'violation-classification',
            Component: Lazy(lazy(() => import('@renderer/pages/QuyCheRenLuyenPhanLoaiViPham'))),
          },
          {
            label: 'Quy chế rèn luyện - Vi phạm',
            icon: <FcRules />,
            path: 'violation',
            Component: Lazy(lazy(() => import('@renderer/pages/QuyCheRenLuyenViPham'))),
          },
          {
            label: 'Quy chế rèn luyện - Khen thưởng',
            icon: <FcIdea />,
            path: 'recognition',
            Component: Lazy(lazy(() => import('@renderer/pages/QuyCheRenLuyenKhenThuong'))),
          },
          {
            label: 'Hình thức xử lý vi phạm quy chế thi',
            icon: <FcRules />,
            path: 'exam-disciplinary-actions',
            Component: Lazy(lazy(() => import('@renderer/pages/HinhThucXuLyViPhamQuyCheThi'))),
          },
        ],
      },
      {
        label: 'Quản lý giảng viên - Phòng học',
        icon: <FcBusinessman />,
        path: 'faculty-room-management',
        Component: Lazy(lazy(() => import('@renderer/pages/FacultyRoomManagement'))),
        children: [
          {
            label: 'Quản lý giảng viên',
            icon: <FcBusinessman />,
            path: 'faculty-management',
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/QuanLyGiangVien'))),
          },
          {
            label: 'Địa điểm phòng',
            icon: <FcDepartment />,
            path: 'room-location',
            Component: Lazy(lazy(() => import('@renderer/pages/DiaDiemPhong'))),
          },
          {
            label: 'Dãy phòng',
            icon: <FcDepartment />,
            path: 'room-section',
            Component: Lazy(lazy(() => import('@renderer/pages/DayNha'))),
          },
          {
            label: 'Phòng học',
            icon: <FcLibrary />,
            path: 'classroom',
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/PhongHoc'))),
          },
          {
            label: 'Lý do xin phòng',
            icon: <FcIdea />,
            path: 'room-request-reason',
            Component: Lazy(lazy(() => import('@renderer/pages/LyDoXinPhong'))),
          },
        ],
      },
    ],
  },
  // {
  //   icon: <FcBusinessman />,
  //   label: 'Quản lý sinh viên',
  //   path: 'student-management',
  //   disabled: true,
  //   children: [],
  // },
  // {
  //   icon: <FcPlanner />,
  //   label: 'Lập kế hoạch và thời khóa biểu',
  //   path: 'planning-and-scheduling',
  //   disabled: true,
  //   children: [],
  // },

  //Start Phase 2 Danh Mục
  {
    label: 'Danh mục',
    icon: <FcMenu />,
    path: 'catalog',
    Component: Lazy(lazy(() => import('@renderer/pages/Catalog'))),
    children: [
      {
        icon: <FcLibrary />,
        label: 'Đào tạo',
        path: 'catalog-training',
        children: [
          {
            icon: <FcFolder />,
            label: 'Bậc đào tạo',
            path: 'catalog-training-level',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucBacDaoTao'))),
          },
          {
            label: 'Loại hình đào tạo',
            icon: <FcFolder />,
            path: 'catalog-training-type',
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucLoaiHinhDaoTao'))),
          },
          {
            icon: <FcFolder />,
            label: 'Thời gian đào tạo',
            path: 'catalog-training-duration',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/ThoiGianDaoTao'))),
          },
          {
            icon: <FcFolder />,
            label: 'Ngành đào tạo',
            path: 'catalog-training-industry',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucNganhDaoTao'))),
          },
          {
            icon: <FcFolder />,
            label: 'Chuyên ngành đào tạo',
            path: 'catalog-training-major',
            disabled: false,
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/ChuyenNganhDaoTao'))),
          },
          {
            icon: <FcFolder />,
            label: 'Năm học',
            path: 'catalog-training-year',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/NamHoc'))),
          },
          {
            icon: <FcFolder />,
            label: 'Khóa học',
            path: 'catalog-training-course',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/KhoaHoc'))),
          },
          {
            icon: <FcFolder />,
            label: 'Học kỳ - Năm học',
            path: 'catalog-training-semester-year',
            disabled: false,
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucHocKyNamHoc'))),
          },
          {
            icon: <FcFolder />,
            label: 'Loại thu phí - Môn học',
            path: 'catalog-training-fee-type-subject',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucLoaiThuPhiMonHoc'))),
          },
          {
            icon: <FcFolder />,
            label: 'Khối kiến thức',
            path: 'catalog-training-block-of-knowledge',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/KhoiKienThuc'))),
          },
          {
            icon: <FcFolder />,
            label: 'Hình thức thi',
            path: 'catalog-training-exam-format',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucHinhThucThi'))),
          },
        ],
      },
      {
        icon: <FcMoneyTransfer />,
        label: 'Tài chính',
        path: 'catalog-finance',
        children: [
          {
            icon: <FcFolder />,
            label: 'Khoản thu học phí',
            path: 'catalog-finance-revenue-fee',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/KhoanThuHocPhi'))),
          },
          {
            icon: <FcFolder />,
            label: 'Khoản thu ngoài học phí',
            path: 'catalog-finance-non-tuition-revenue',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/KhoanThuNgoaiHocPhi'))),
          },
          {
            icon: <FcFolder />,
            label: 'Khoản thu tự do',
            path: 'catalog-finance-free-revenue',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucKhoanThuTuDo'))),
          },
          {
            icon: <FcFolder />,
            label: 'Khoản chi',
            path: 'catalog-finance-expense',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/KhoanChi'))),
          },
          {
            icon: <FcFolder />,
            label: 'Loại khoản thu ngoài học phí',
            path: 'catalog-finance-types-of-non-tuition-fees',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/LoaiKhoanThuNgoaiHocPhi'))),
          },
        ],
      },
      // {
      //   icon: <FcGraduationCap />,
      //   label: 'Tuyển sinh',
      //   path: 'catalog-enrollment',
      //   children: [],
      // },
      {
        icon: <FcPortraitMode />,
        label: 'HSSV',
        path: 'catalog-student',
        children: [
          {
            icon: <FcFolder />,
            label: 'Cán sự lớp',
            path: 'catalog-student-officer-class',
            disabled: false,
            hasDivider: true,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucCanSuLop'))),
          },
          {
            icon: <FcFolder />,
            label: 'Hồ sơ - HSSV',
            path: 'catalog-student-profile',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucHoSoHssv'))),
          },
          {
            icon: <FcFolder />,
            label: 'Khung hồ sơ - HSSV',
            path: 'catalog-student-profile-frame',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucKhungHoSoHssv'))),
          },
          {
            icon: <FcFolder />,
            label: 'Nội dung',
            path: 'catalog-student-content',
            disabled: false,
            Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucNoiDung'))),
          },
        ],
      },
      {
        icon: <FcDocument />,
        label: 'Biểu mẫu',
        path: 'catalog-form',
        children: [],
        Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucBieuMau'))),
      },
      {
        label: 'Danh mục khoa',
        icon: <FcOrganization />,
        path: 'department-catalog',
        Component: Lazy(lazy(() => import('@renderer/pages/danh-muc/DanhMucKhoa'))),
      },
    ],
  },
  //End Phase 2 Danh Mục
  {
    icon: <FcBusinessman />,
    label: 'Học vụ sinh viên',
    path: 'hoc-vu-sinh-vien',
    Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/HocVuSinhVien'))),
    children: [
      {
        path: 'quan-ly-lop-hoc',
        label: 'Quản lý lớp học',
        icon: <FcFolder />,
        children: [
          {
            path: 'danh-sach-lop-hoc',
            label: 'Danh sách lớp học',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachLopHoc'))),
          },
          {
            path: 'chuyen-lop',
            label: 'Chuyển lớp',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ChuyenLop'))),
          },
          {
            path: 'chuyen-lop-tu-do',
            label: 'Chuyển lớp tự do',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ChuyenLopTuDoPage')),
            ),
            disabled: false,
          },
          {
            path: 'phan-chuyen-nganh',
            label: 'Phân chuyên ngành',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/PhanChuyenNganh'))),
            hasDivider: true,
          },
          {
            path: 'danh-sach-sinh-vien-lop-hoc-phan',
            label: 'Danh sách sinh viên lớp học phần',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachSinhVienLopHocPhan')),
            ),
            disabled: false,
            hasDivider: true,
          },
          {
            path: 'bao-cao-sinh-vien-chuyen-lop',
            label: 'Báo cáo sinh viên chuyển lớp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoSinhVienChuyenLop')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-sinh-vien',
        label: 'Quản lý sinh viên',
        icon: <FcFolder />,
        children: [
          {
            path: 'tra-cuu-sinh-vien',
            label: 'Tra cứu sinh viên',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TraCuuSinhVien'))),
            hasDivider: true,
          },
          {
            path: 'cap-nhat-trang-thai-sinh-vien',
            label: 'Cập nhật trạng thái sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/CapNhatTrangThaiSinhVien')),
            ),
            hasDivider: true,
          },
          {
            path: 'import-hinh-sinh-vien',
            label: 'Import hình sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ImportHinhSinhVien')),
            ),
          },
          {
            path: 'in-the-sinh-vien',
            label: 'In thẻ sinh viên',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/InTheSinhVien'))),
            hasDivider: true,
          },
          {
            path: 'danh-sach-sinh-vien-hoc-nganh-2',
            label: 'Danh sách sinh viên học ngành 2',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachSinhVienHocNganh2')),
            ),
          },
          {
            path: 'danh-sach-sinh-vien-mien-mon-hoc',
            label: 'Danh sách sinh viên miễn môn học',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachSinhVienMienMonHoc')),
            ),
          },
          {
            path: 'dang-ky-sinh-vien-chuyen-truong',
            label: 'Đăng ký sinh viên chuyển trường',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKySinhVienChuyenTruong')),
            ),
            hasDivider: true,
          },
          {
            path: 'tra-cuu-lich-hoc-lich-thi-sinh-vien',
            label: 'Tra cứu lịch học - lịch thi sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TraCuuLichHocLichThiSinhVien')),
            ),
            disabled: false,
            hasDivider: true,
          },
          {
            path: 'tiep-nhan-ho-so-sinh-vien',
            label: 'Tiếp nhận hồ sơ sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TiepNhanHoSoSinhVien')),
            ),
            disabled: false,
            hasDivider: true,
          },
          {
            path: 'thong-ke-tiep-nhan-ho-so-sinh-vien',
            label: 'Thống kê tiếp nhận hồ sơ sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeTiepNhanHoSoSinhVien')),
            ),
          },
          {
            path: 'thong-ke-tiep-nhan-ho-so-sinh-vien-theo-nguoi-tiep-nhan',
            label: 'Thống kê tiếp nhận hồ sơ sinh viên theo người tiếp nhận',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () =>
                  import(
                    '@renderer/pages/hoc-vu-sinh-vien/ThongKeTiepNhanHoSoSinhVienTheoNguoiTiepNhan'
                  ),
              ),
            ),
            hasDivider: true,
          },
          {
            path: 'nhat-ky-cap-nhat-trang-thai-sinh-vien',
            label: 'Nhật ký cập nhật trạng thái sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhatKyCapNhatTrangThaiSinhVien')),
            ),
            hasDivider: true,
          },
          {
            path: 'thong-ke-danh-sach-in-bieu-mau',
            label: 'Thống kê danh sách in biểu mẫu',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeDanhSachInBieuMau')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-dang-ky-hoc-phan',
        label: 'Quản lý đăng ký học phần',
        icon: <FcFolder />,
        children: [
          {
            path: 'dang-ky-hoc-phan-tu-dong',
            label: 'Đăng ký học phần tự động',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocPhanTuDong')),
            ),
          },
          {
            path: 'dang-ky-hoc-phan-sinh-vien',
            label: 'Đăng ký học phần sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocPhanSinhVien')),
            ),
          },
          {
            path: 'dang-ky-hoc-phan-theo-nhom',
            label: 'Đăng ký học phần theo nhóm',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocPhanTheoNhom')),
            ),
          },
          {
            path: 'dang-ky-hoc-lai-theo-lop-hoc-phan',
            label: 'Đăng ký học lại theo lớp học phần',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocLaiTheoLopHocPhan')),
            ),
          },
          {
            path: 'dang-ky-hoc-cai-thien',
            label: 'Đăng ký học cải thiện',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocCaiThien')),
            ),
          },
          {
            path: 'dang-ky-hoc-phan-mo-rong',
            label: 'Đăng ký học phần mở rộng',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocPhanMoRong')),
            ),
          },
          {
            path: 'dang-ky-hoc-phan-nganh-2',
            label: 'Đăng ký học phần ngành 2',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocPhanNganh2')),
            ),
            disabled: true,
          },
          {
            path: 'dang-ky-hoc-phan-cai-thien-nganh-2',
            label: 'Đăng ký học phần cải thiện ngành 2',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocPhanNganh2')),
            ),
          },
          {
            path: 'dang-ky-hoc-phan-tu-do',
            label: 'Đăng ký học phần tự do',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyHocPhanTuDo')),
            ),
          },
          {
            path: 'chuyen-lop-hoc-phan',
            label: 'Chuyển lớp học phần',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ChuyenLopHocPhan')),
            ),
          },
          {
            path: 'huy-dang-ky-hoc-phan-sinh-vien',
            label: 'Hủy đăng ký học phần sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/HuyDangKyHocPhanSinhVien')),
            ),
          },
          {
            path: 'huy-lop-hoc-phan',
            label: 'Hủy lớp học phần',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/HuyLopHocPhan'))),
          },
          {
            path: 'dang-ky-gia-han-nop-hoc-phi',
            label: 'Đăng ký gia hạn nộp học phí',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyGiaHanNopHocPhi')),
            ),
          },
          {
            path: 'huy-dang-ky-hoc-phan-chua-nop-hoc-phi',
            label: 'Hủy đăng ký học phần chưa nộp học phí',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/HuyDangKyHocPhanChuaNopHocPhi')),
            ),
            disabled: true,
          },
          {
            path: 'quy-dinh-han-nop-hoc-phi-hoc-ky',
            label: 'Quy định hạn nộp học phí học kỳ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/QuyDinhHanNopHocPhiHocKy')),
            ),
          },
          {
            path: 'cap-nhat-ngay-het-han-nop-hoc-phi-lop-hoc-phan',
            label: 'Cập nhật ngày hết hạn nộp học phí lớp học phần',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () =>
                  import('@renderer/pages/hoc-vu-sinh-vien/CapNhatNgayHetHanNopHocPhiLopHocPhan'),
              ),
            ),
          },
          {
            path: 'thong-ke-so-tin-chi-sinh-vien-dang-ky-theo-dot',
            label: 'Thống kê số tín chỉ sinh viên đăng ký theo đợt',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () =>
                  import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSoTinChiSinhVienDangKyTheoDot'),
              ),
            ),
            disabled: true,
          },
          {
            path: 'bao-cao-sinh-vien-khong-dang-ky-hoc-phan-theo-dot',
            label: 'Báo cáo sinh viên không đăng ký học phần theo đợt',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () =>
                  import(
                    '@renderer/pages/hoc-vu-sinh-vien/BaoCaoSinhVienKhongDangKyHocPhanTheoDot'
                  ),
              ),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-ket-qua-hoc-tap',
        label: 'Quản lý kết quả học tập',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'phan-quyen-nhap-diem',
            label: 'Phân quyền nhập điểm',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/PhanQuyenNhapDiem')),
            ),
          },
          {
            path: 'danh-sach-sinh-vien-vang-thi-co-ly-do',
            label: 'Danh sách sinh viên vắng thi có lý do',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachSinhVienVangThiCoLyDo')),
            ),
            disabled: true,
          },
          {
            path: 'in-bang-diem-ket-qua-hoc-tap',
            label: 'In bảng điểm kết quả học tập',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/InBangDiemKetQuaHocTap')),
            ),
          },
          {
            path: 'ket-qua-hoc-tap',
            label: 'Kết quả học tập',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/KetQuaHocTap'))),
          },
          {
            path: 'xem-chi-tiet-ket-qua-hoc-tap-sinh-vien',
            label: 'Xem chi tiết kết quả học tập sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XemChiTietKetQuaHocTapSinhVien')),
            ),
          },
          {
            path: 'nhap-diem-qua-trinh-xet-du-thi',
            label: 'Nhập điểm quá trình - Xét dự thi',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhapDiemQuaTrinhXetDuThi')),
            ),
          },
          {
            path: 'xet-dieu-kien-du-thi',
            label: 'Xét điều kiện dự thi',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetDieuKienDuThi')),
            ),
          },
          {
            path: 'nhap-diem-ket-thuc',
            label: 'Nhập điểm kết thúc',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhapDiemKetThuc'))),
          },
          {
            path: 'in-bang-diem-theo-lop-hoc-phan',
            label: 'In bảng điểm theo lớp học phần',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/InBangDiemTheoLopHocPhan')),
            ),
          },
          {
            path: 'khoa-bang-diem-theo-lop-hoc-phan',
            label: 'Khóa bảng điểm theo lớp học phần',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/KhoaBangDiemTheoLopHocPhan')),
            ),
          },
          {
            path: 'sua-diem-sinh-vien',
            label: 'Sửa điểm sinh viên',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/SuaDiemSinhVien'))),
          },
          {
            path: 'nhap-diem-tong-ket-mon-hoc-sinh-vien',
            label: 'Nhập điểm tổng kết môn học sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhapDiemTongKetMonHocSinhVien')),
            ),
          },
          {
            path: 'xu-ly-diem-so',
            label: 'Xử lý điểm số',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XuLyDiemSo'))),
          },
          {
            path: 'khoa-diem-hoc-tap',
            label: 'Khóa điểm học tập',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/KhoaDiemHocTap'))),
          },
          {
            path: 'huy-ket-qua-hoc-tap',
            label: 'Hủy kết quả học tập',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/HuyKetQuaHocTap'))),
          },
          {
            path: 'bao-cao-lop-hoc-phan-chua-nhap-diem',
            label: 'Báo cáo lớp học phần chưa nhập điểm',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoLopHocPhanChuaNhapDiem')),
            ),
          },
          {
            path: 'bao-cao-tinh-hinh-nhap-diem-sinh-vien',
            label: 'Báo cáo tình hình nhập điểm sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTinhHinhNhapDiemSinhVien')),
            ),
          },
          {
            path: 'nhat-ky-sua-diem-tong-hop',
            label: 'Nhật ký sửa điểm tổng hợp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhatKySuaDiemTongHop')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-thi-lai',
        label: 'Quản lý thi lại',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'thong-ke-sinh-vien-thi-lai',
            label: 'Thống kê sinh viên thi lại',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienThiLai')),
            ),
          },
          {
            path: 'dang-ky-thi-lai-theo-mon-hoc-phan',
            label: 'Đăng ký thi lại theo môn học phần',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyThiLaiTheoMonHocPhan')),
            ),
          },
          {
            path: 'mo-lop-va-dang-ky-thi-lai-tu-dong',
            label: 'Mở lớp và đăng ký thi lại tự động',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/MoLopVaDangKyThiLaiTuDong')),
            ),
          },
          {
            path: 'huy-dang-ky-thi-lai-chua-nop-hoc-phi',
            label: 'Hủy đăng ký thi lại chưa nộp học phí',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/HuyDangKyThiLaiChuaNopHocPhi')),
            ),
          },
          {
            path: 'danh-sach-sinh-vien-thi-lai',
            label: 'Danh sách sinh viên thi lại',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachSinhVienThiLai')),
            ),
          },
          {
            path: 'nhap-diem-thi-lai',
            label: 'Nhập điểm thi lại',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhapDiemThiLai'))),
          },
        ],
      },
      {
        path: 'quan-ly-to-chuc-thi-hoc-phan',
        label: 'Quản lý tổ chức thi học phần',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'danh-sach-tron-lich-thi-sinh-vien',
            label: 'Danh sách trộn lịch thi sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachTronLichThiSinhVien')),
            ),
          },
          {
            path: 'danh-sach-lich-thi-sinh-vien',
            label: 'Danh sách lịch thi sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachLichThiSinhVien')),
            ),
          },
          {
            path: 'thong-ke-trung-lich-thi-sinh-vien',
            label: 'Thống kê trùng lịch thi sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeTrungLichThiSinhVien')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-chuyen-can-ren-luyen',
        label: 'Quản lý chuyển cần - rèn luyện',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'diem-danh-sinh-vien',
            label: 'Điểm danh sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DiemDanhSinhVien')),
            ),
          },
          {
            path: 'import-export-diem-danh-sinh-vien',
            label: 'Import/Export điểm danh sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ImportExportDiemDanhSinhVien')),
            ),
          },
          {
            path: 'xu-ly-vi-pham-sinh-vien',
            label: 'Xử lý vi phạm sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XuLyViPhamSinhVien')),
            ),
          },
          {
            path: 'khen-thuong-sinh-vien',
            label: 'Khen thưởng sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/KhenThuongSinhVien')),
            ),
          },
          {
            path: 'xu-ly-vi-pham-quy-che-thi',
            label: 'Xử lý vi phạm quy chế thi',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XuLyViPhamQuyCheThi')),
            ),
          },
          {
            path: 'nhap-diem-ren-luyen-sinh-vien-gv',
            label: 'Nhập điểm rèn luyện sinh viên - GV',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhapDiemRenLuyenSinhVienGV')),
            ),
          },
          {
            path: 'import-diem-ren-luyen-sinh-vien',
            label: 'Import điểm rèn luyện sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ImportDiemRenLuyenSinhVien')),
            ),
          },
          {
            path: 'khoa-diem-ren-luyen',
            label: 'Khóa điểm rèn luyện',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/KhoaDiemRenLuyen')),
            ),
          },
          {
            path: 'bao-cao-tinh-hinh-giang-vien-diem-danh-01',
            label: 'Báo cáo tình hình giảng viên điểm danh 01',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTinhHinhGiangVienDiemDanh01'),
              ),
            ),
          },
          {
            path: 'bao-cao-tinh-hinh-giang-vien-diem-danh-02',
            label: 'Báo cáo tình hình giảng viên điểm danh 02',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTinhHinhGiangVienDiemDanh02'),
              ),
            ),
          },
          {
            path: 'thong-ke-sinh-vien-vang',
            label: 'Thống kê sinh viên vắng',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienVang')),
            ),
          },
          {
            path: 'thong-ke-sinh-vien-vang-theo-ngay',
            label: 'Thông kê sinh viên vắng theo ngày',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienVangTheoNgay')),
            ),
          },
          {
            path: 'thong-ke-xu-ly-vi-pham-sinh-vien',
            label: 'Thống kê xử lý vi phạm sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeXuLyViPhamSinhVien')),
            ),
          },
          {
            path: 'lop-hoc-chua-nhap-diem-ren-luyen',
            label: 'Lớp học chưa nhập điểm rèn luyện',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/LopHocChuaNhapDiemRenLuyen')),
            ),
          },
          {
            path: 'bao-cao-tong-hop-sinh-vien-ren-luyen-kem',
            label: 'Báo cáo tổng hợp sinh viên rèn luyện kém',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTongHopSinhVienRenLuyenKem'),
              ),
            ),
          },
          {
            path: 'tong-hop-ket-qua-ren-luyen-theo-hoc-ky',
            label: 'Tổng hợp kết quả rèn luyện theo học kỳ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TongHopKetQuaRenLuyenTheoHocKy')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-tien-do-hoc-tap',
        label: 'Quản lý tiến độ học tập',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'tong-ket-hoc-ky-theo-bac',
            label: 'Tổng kết học kỳ theo bậc',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TongKetHocKyTheoBac')),
            ),
          },
          {
            path: 'tong-ket-hoc-ky-tin-chi',
            label: 'Tổng kết học kỳ - Tín chỉ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TongKetHocKyTinChi')),
            ),
          },
          {
            path: 'xet-cong-nhan-nam-sinh-vien',
            label: 'Xét công nhận năm sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetCongNhanNamSinhVien')),
            ),
          },
          {
            path: 'tong-ket-hoc-ky-nien-che',
            label: 'Tổng kết học kỳ - niên chế',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TongKetHocKyNienChe')),
            ),
          },
          {
            path: 'xet-tong-ket-nam-nien-che',
            label: 'Xét tổng kết năm - niên chế',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetTongKetNamNienChe')),
            ),
          },
          {
            path: 'xet-len-lop',
            label: 'Xét lên lớp',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetLenLop'))),
          },
          {
            path: 'tong-ket-nam-hoc',
            label: 'Tổng kết năm học',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TongKetNamHoc'))),
          },
          {
            path: 'tong-ket-nam-hoc-theo-bac',
            label: 'Tổng kết năm học theo bậc',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TongKetNamHocTheoBac')),
            ),
          },
          {
            path: 'tong-ket-toan-khoa-theo-bac',
            label: 'Tổng kết toàn khóa theo bậc',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TongKetToanKhoaTheoBac')),
            ),
          },
          {
            path: 'bang-diem-tong-ket-hoc-ky',
            label: 'Bảng điểm tổng kết học kỳ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BangDiemTongKetHocKy')),
            ),
          },
          {
            path: 'bang-diem-tong-ket-nam-hoc',
            label: 'Bảng điểm tổng kết năm học',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BangDiemTongKetNamHoc')),
            ),
          },
          {
            path: 'bang-diem-tong-ket-khoa-hoc',
            label: 'Bảng điểm tổng kết khóa học',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BangDiemTongKetKhoaHoc')),
            ),
          },
          {
            path: 'thong-ke-xu-ly-hoc-vu-sinh-vien',
            label: 'Thống kế xử lý học vụ sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeXuLyHocVuSinhVien')),
            ),
          },
          {
            path: 'bao-cao-xet-len-lop-theo-lop',
            label: 'Báo cáo xét lên lớp theo lớp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoXetLenLopTheoLop')),
            ),
          },
          {
            path: 'bao-cao-tong-hop-xet-len-lop',
            label: 'Báo cáo tổng hợp xét lên lớp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTongHopXetLenLop')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-hoc-bong-danh-hieu',
        label: 'Quản lý học bổng danh hiệu',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'xet-hoc-bong-theo-dot',
            label: 'Xét học bổng theo đợt',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetHocBongTheoDot')),
            ),
          },
          {
            path: 'duyet-hoc-bong-theo-dot',
            label: 'Duyệt học bổng theo đợt',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DuyetHocBongTheoDot')),
            ),
          },
          {
            path: 'danh-sach-cap-hoc-bong-theo-dot',
            label: 'Danh sách cấp học bổng theo đợt',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachCapHocBongTheoDot')),
            ),
          },
          {
            path: 'xet-hoc-bong-theo-nam',
            label: 'Xét học bổng theo năm',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetHocBongTheoNam')),
            ),
          },
          {
            path: 'danh-sach-cap-hoc-bong-theo-nam',
            label: 'Danh sách cấp học bổng theo năm',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachCapHocBongTheoNam')),
            ),
          },
          {
            path: 'xet-danh-hieu-theo-dot',
            label: 'Xét danh hiệu theo đợt',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetDanhHieuTheoDot')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-mon-gdtc-gdqp',
        label: 'Quản lý môn GDTC - GDQP',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'dot-cap-chung-chi-gdtc-gdqp',
            label: 'Đợt cấp chứng chỉ GDTC - GDQP',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DotCapChungChiGdtcGdqp')),
            ),
          },
          {
            path: 'tinh-diem-trung-binh-gdtc-gdqp',
            label: 'Tính điểm trung bình GDTC - GDQP',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TinhDiemTrungBinhGdtcGdqp')),
            ),
          },
          {
            path: 'xet-cap-chung-chi-gdtc-gdqp',
            label: 'Xét cấp chứng chỉ GDTC - GDQP',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetCapChungChiGdtcGdqp')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-tot-nghiep',
        label: 'Quản lý tốt nghiệp',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'nhap-chung-chi-sinh-vien',
            label: 'Nhập chứng chỉ sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhapChungChiSinhVien')),
            ),
          },
          {
            path: 'import-chung-chi-sinh-vien',
            label: 'Import chứng chỉ sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ImportChungChiSinhVien')),
            ),
          },
          {
            path: 'thong-ke-sinh-vien-no-chuan-dau-ra',
            label: 'Thống kê sinh viên nợ chuẩn đầu ra',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienNoChuanDauRa')),
            ),
          },
          {
            path: 'dot-xet-tot-nghiep',
            label: 'Đợt xét tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DotXetTotNghiep'))),
          },
          {
            path: 'de-xuat-xet-tot-nghiep-tin-chi',
            label: 'Đề xuất xét tốt nghiệp - Tín chỉ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DeXuatXetTotNghiepTinChi')),
            ),
          },
          {
            path: 'xet-tot-nghiep-tin-chi',
            label: 'Xét tốt nghiệp - Tín chỉ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetTotNghiepTinChi')),
            ),
          },
          {
            path: 'bo-sung-mon-hoc-xet-tot-nghiep',
            label: 'Bổ sung môn học xét tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BoSungMonHocXetTotNghiep')),
            ),
          },
          {
            path: 'de-xuat-xet-tot-nghiep-nganh-2',
            label: 'Đề xuất xét tốt nghiệp ngành 2',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DeXuatXetTotNghiepNganh2')),
            ),
          },
          {
            path: 'xet-tot-nghiep-nganh-2-tin-chi',
            label: 'Xét tốt nghiệp ngành 2 - Tín chỉ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetTotNghiepNganh2TinChi')),
            ),
          },
          {
            path: 'mon-thi-tot-nghiep',
            label: 'Môn thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/MonThiTotNghiep'))),
          },
          {
            path: 'xet-dieu-kien-du-thi-tot-nghiep',
            label: 'Xét điều kiện dự thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetDieuKienDuThiTotNghiep')),
            ),
          },
          {
            path: 'sinh-vien-lam-do-an-khoa-luan',
            label: 'Sinh viên làm đồ án khóa luận',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/SinhVienLamDoAnKhoaLuan')),
            ),
          },
          {
            path: 'mo-mon-va-dang-ky-thi-tot-nghiep-tu-dong',
            label: 'Mở môn và đăng ký thi tốt nghiệp tự động',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/MoMonVaDangKyThiTotNghiepTuDong'),
              ),
            ),
          },
          {
            path: 'dang-ky-thi-tot-nghiep',
            label: 'Đăng ký thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyThiTotNghiep')),
            ),
          },
          {
            path: 'dang-ky-thi-lai-tot-nghiep',
            label: 'Đăng ký thi lại tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DangKyThiLaiTotNghiep')),
            ),
          },
          {
            path: 'danh-sach-sinh-vien-du-thi-tot-nghiep-theo-mon',
            label: 'Danh sách sinh viên dự thi tốt nghiệp theo môn',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () =>
                  import('@renderer/pages/hoc-vu-sinh-vien/DanhSachSinhVienDuThiTotNghiepTheoMon'),
              ),
            ),
          },
          {
            path: 'phan-quyen-nhap-diem-thi-tot-nghiep',
            label: 'Phân quyền nhập điểm thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/PhanQuyenNhapDiemThiTotNghiep')),
            ),
          },
          {
            path: 'nhap-diem-thi-tot-nghiep',
            label: 'Nhập điểm thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhapDiemThiTotNghiep')),
            ),
          },
          {
            path: 'khoa-diem-thi-tot-nghiep',
            label: 'Khóa điểm thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/KhoaDiemThiTotNghiep')),
            ),
          },
          {
            path: 'xet-tot-nghiep-nien-che',
            label: 'Xét tốt nghiệp - Niên chế',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/XetTotNghiepNienChe')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-to-chuc-thi-tot-nghiep-nien-che',
        label: 'Quản lý tổ chức thi tốt nghiệp niên chế',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'tron-danh-sach-thi-tot-nghiep',
            label: 'Trộn danh sách thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TronDanhSachThiTotNghiep')),
            ),
          },
          {
            path: 'danh-so-bao-danh',
            label: 'Đánh số báo danh',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSoBaoDanh'))),
          },
          {
            path: 'danh-sach-tron-lich-thi-tot-nghiep',
            label: 'Danh sách trộn lịch thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/DanhSachTronLichThiTotNghiep')),
            ),
          },
          {
            path: 'quan-ly-don-tui-bai-thi-danh-phach',
            label: 'Quản lý dồn túi bài thi đánh phách',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/QuanLyDonTuiBaiThiDanhPhach')),
            ),
          },
          {
            path: 'huong-dan-don-tui-bai-thi',
            label: 'Hướng dẫn dồn túi bài thi',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/HuongDanDonTuiBaiThi')),
            ),
          },
          {
            path: 'huong-dan-danh-phach',
            label: 'Hướng dẫn đánh phách',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/HuongDanDanhPhach')),
            ),
          },
          {
            path: 'khoa-don-tui-bai-thi',
            label: 'Khóa dồn túi bài thi',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/KhoaDonTuiBaiThi')),
            ),
          },
          {
            path: 'nhap-diem-thi-tot-nghiep-theo-phach',
            label: 'Nhập điểm thi tốt nghiệp theo phách',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/NhapDiemThiTotNghiepTheoPhach')),
            ),
          },
        ],
      },
      {
        path: 'quan-ly-bang-cap',
        label: 'Quản lý bằng cấp',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'quan-ly-bang-cap',
            label: 'Quản lý bằng cấp',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/QuanLyBangCap'))),
          },
          {
            path: 'cap-bang-tot-nghiep',
            label: 'Cấp bằng tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/CapBangTotNghiep')),
            ),
          },
          {
            path: 'tra-cuu-van-bang',
            label: 'Tra cứu văn bằng',
            icon: <FcFolder />,
            Component: Lazy(lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/TraCuuVanBang'))),
          },
        ],
      },
      {
        path: 'bao-cao-so-luong-sinh-vien',
        label: 'Báo cáo số lượng sinh viên',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'thong-ke-si-so-lop-hoc',
            label: 'Thống kê sỉ số lớp học',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSiSoLopHoc')),
            ),
          },
          {
            path: 'thong-ke-so-lieu-sinh-vien-theo-trinh-do-dao-tao',
            label: 'Thống kê số liệu sinh viên theo trình độ đào tạo',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () =>
                  import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSoLieuSinhVienTheoTrinhDoDaoTao'),
              ),
            ),
          },
          {
            path: 'thong-ke-dan-toc-theo-lop',
            label: 'Thống kê Dân tộc theo lớp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeDanTocTheoLop')),
            ),
          },
          {
            path: 'thong-ke-dan-toc-ton-giao',
            label: 'Thông kê Dân tộc - Tôn giáo',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeDanTocTonGiao')),
            ),
          },
          {
            path: 'thong-ke-sinh-vien-dang-hoc-mau-bgd-dt',
            label: 'Thống kê sinh viên đang học (Mẫu BGD&ĐT)',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienDangHocMauBGDDT')),
            ),
          },
          {
            path: 'bao-cao-si-so-sinh-vien',
            label: 'Báo cáo sỉ số sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoSiSoSinhVien')),
            ),
          },
          {
            path: 'bao-cao-si-so-tong-hop',
            label: 'Báo cáo sỉ số tổng hợp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoSiSoTongHop')),
            ),
          },
          {
            path: 'bao-cao-quy-mo-sinh-vien-toan-truong',
            label: 'Báo cáo quy mô sinh viên toàn trường',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoQuyMoSinhVienToanTruong')),
            ),
          },
          {
            path: 'thong-ke-so-luong-sinh-vien-tong-hop',
            label: 'Thống kê số lượng sinh viên tổng hợp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSoLuongSinhVienTongHop')),
            ),
          },
          {
            path: 'thong-ke-so-luong-sinh-vien-toan-truong',
            label: 'Thống kê số lượng sinh viên toàn trường',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSoLuongSinhVienToanTruong'),
              ),
            ),
          },
        ],
      },
      {
        path: 'bao-cao-ket-qua-hoc-tap',
        label: 'Báo cáo kết quả học tập',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'thong-ke-sinh-vien-hoc-lai-cai-thien',
            label: 'Thống kê sinh viên học lại - cải thiện',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienHocLaiCaiThien')),
            ),
          },
          {
            path: 'thong-ke-sinh-vien-no-mon-hoc',
            label: 'Thống kê sinh viên nợ môn học',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienNoMonHoc')),
            ),
          },
          {
            path: 'thong-ke-sinh-vien-hoc-lai',
            label: 'Thống kê sinh viên học lại',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienHocLai')),
            ),
          },
          {
            path: 'thong-ke-ket-qua-thi',
            label: 'Thống kê kết quả thi',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeKetQuaThi')),
            ),
          },
          {
            path: 'thong-ke-so-lan-thi-sinh-vien',
            label: 'Thông kê số lần thi sinh viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSoLanThiSinhVien')),
            ),
          },
          {
            path: 'bao-cao-ket-qua-thi-theo-thang-diem',
            label: 'Báo cáo kết quả thi theo thang điểm',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoKetQuaThiTheoThangDiem')),
            ),
          },
          {
            path: 'thong-ke-sinh-vien-cam-thi',
            label: 'Thống kê sinh viên cấm thi',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/ThongKeSinhVienCamThi')),
            ),
          },
        ],
      },
      {
        path: 'bao-cao-chat-luong-dao-tao',
        label: 'Báo cáo chất lượng đào tạo',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'bao-cao-chat-luong-dao-tao',
            label: 'Báo cáo chất lượng đào tạo',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongDaoTao')),
            ),
          },
          {
            path: 'bao-cao-chat-luong-mon-hoc',
            label: 'Báo cáo chất lượng môn học',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongMonHoc')),
            ),
          },
          {
            path: 'bao-cao-chat-luong-mon-hoc-phan',
            label: 'Báo cáo chất lượng môn học phần',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongMonHocPhan')),
            ),
          },
          {
            path: 'bao-cao-chat-luong-giang-vien',
            label: 'Báo cáo chất lượng giảng viên',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongGiangVien')),
            ),
          },
          {
            path: 'bao-cao-chat-luong-dao-tao-lhp',
            label: 'Báo cáo chất lượng đào tạo LHP',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongDaoTaoLHP')),
            ),
          },
          {
            path: 'bao-cao-chat-luong-dao-tao-theo-hoc-ky',
            label: 'Báo cáo chất lượng đào tạo theo học kỳ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongDaoTaoTheoHocKy')),
            ),
          },
          {
            path: 'bao-cao-chat-luong-dao-tao-tong-ket-hoc-ky',
            label: 'Báo cáo chất lượng đào tạo tổng kết học kỳ',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongDaoTaoTongKetHocKy'),
              ),
            ),
          },
          {
            path: 'bao-cao-chat-luong-dao-tao-theo-nam-hoc',
            label: 'Báo cáo chất lượng đào tạo theo năm học',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongDaoTaoTheoNamHoc'),
              ),
            ),
          },
          {
            path: 'bao-cao-chat-luong-dao-tao-tong-ket-nam-hoc',
            label: 'Báo cáo chất lượng đào tạo tổng kết năm học',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoChatLuongDaoTaoTongKetNamHoc'),
              ),
            ),
          },
          {
            path: 'bao-cao-tong-hop-ket-qua-xep-loai-len-lop',
            label: 'Báo cáo tổng hợp kết quả xếp loại lên lớp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTongHopKetQuaXepLoaiLenLop'),
              ),
            ),
          },
          {
            path: 'bao-cao-ket-qua-tong-ket-nam-hoc-mau-bgd-dt',
            label: 'Báo cáo kết quả tổng kết năm học (Mẫu BGD&ĐT)',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoKetQuaTongKetNamHocMauBGDDT'),
              ),
            ),
          },
        ],
      },
      {
        path: 'bao-cao-xet-tot-nghiep',
        label: 'Báo cáo xét tốt nghiệp',
        icon: <FcFolder />,
        disabled: true,
        children: [
          {
            path: 'bao-cao-tong-hop-xet-du-thi-tot-nghiep-nien-che',
            label: 'Báo cáo tổng hợp xét dự thi tốt nghiệp - Niên chế',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () =>
                  import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTongHopXetDuThiTotNghiepNienChe'),
              ),
            ),
          },
          {
            path: 'bao-cao-tong-hop-theo-mon-thi-tot-nghiep',
            label: 'Báo cáo tổng hợp theo môn thi tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTongHopTheoMonThiTotNghiep'),
              ),
            ),
          },
          {
            path: 'bao-cao-tong-hop-xet-tot-nghiep-theo-bac',
            label: 'Báo cáo tổng hợp xét tốt nghiệp theo bậc',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTongHopXetTotNghiepTheoBac'),
              ),
            ),
          },
          {
            path: 'bao-cao-tong-hop-xet-tot-nghiep-theo-nganh',
            label: 'Báo cáo tổng hợp xét tốt nghiệp theo ngành',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(
                () => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTongHopXetTotNghiepTheoNganh'),
              ),
            ),
          },
          {
            path: 'bao-cao-tong-hop-xet-tot-nghiep',
            label: 'Báo cáo tổng hợp xét tốt nghiệp',
            icon: <FcFolder />,
            Component: Lazy(
              lazy(() => import('@renderer/pages/hoc-vu-sinh-vien/BaoCaoTongHopXetTotNghiep')),
            ),
          },
        ],
      },
    ],
  },
  {
    label: 'Tài chính Sinh viên',
    icon: <FcCurrencyExchange />,
    path: 'student-financial',
    Component: Lazy(
      lazy(() => import('@renderer/pages/student-financial-management/QuanLyTaiChinhSinhVien')),
    ),
    children: [
      {
        label: 'Quản lý công nợ',
        icon: <FcDocument />,
        path: 'debt-management',
        children: [
          {
            label: 'Danh sách công nợ',
            icon: <FcParallelTasks />,
            path: 'list',
            Component: Lazy(
              lazy(() => import('@renderer/pages/student-financial-management/DanhSachCongNo')),
            ),
          },
          // {
          //   label: 'Tạo công nợ đầu kỳ',
          //   icon: <FcPlanner />,
          //   path: 'create',
          //   //    Component: Lazy(lazy(() => import('@renderer/pages/student-financial-management/CongNoSinhVien/CreateCongNo'))),
          // }
        ],
      },
      {
        label: 'Quản lý thu chi',
        icon: <FcMoneyTransfer />,
        path: 'transaction-management',
        children: [
          {
            label: 'Danh sách phiếu thu',
            icon: <FcMoneyTransfer />,
            path: 'collect-fee',
            Component: Lazy(
              lazy(() => import('@renderer/pages/student-financial-management/DanhSachPhieuThu')),
            ),
          },
          // {
          //   label: 'Lịch sử thu tiền',
          //   icon: <FcRules />,
          //   path: 'collection-history',
          //   //          Component: Lazy(lazy(() => import('@renderer/pages/student-financial-management/PhieuThu'))),
          // },
          {
            label: 'Danh sách phiếu chi',
            icon: <FcCurrencyExchange />,
            path: 'refund',
            Component: Lazy(
              lazy(() => import('@renderer/pages/student-financial-management/DanhSachPhieuChi')),
            ),
          },
        ],
      },
      {
        label: 'Chính sách miễn giảm',
        icon: <FcIdea />,
        path: 'scholarship-waiver',
        children: [
          {
            label: 'Danh sách chính sách miễn giảm',
            icon: <FcMoneyTransfer />,
            path: 'collect-fee',
            Component: Lazy(
              lazy(
                () =>
                  import('@renderer/pages/student-financial-management/DanhSachChinhSachMienGiam'),
              ),
            ),
          },
          {
            label: 'Danh sách sinh viên nhận miễn giảm',
            icon: <FcParallelTasks />,
            path: 'list',
            Component: Lazy(
              lazy(
                () =>
                  import(
                    '@renderer/pages/student-financial-management/DanhSachSinhVienNhanMienGiam'
                  ),
              ),
            ),
          },
        ],
      },
      // {
      //   label: 'Báo cáo tài chính',
      //   icon: <FcSurvey />,
      //   path: 'financial-report',
      //   // Component: Lazy(lazy(() => import('@renderer/pages/student-financial-management/ThongKeTaiChinh'))),
      // }
    ],
  },
  {
    icon: <FcQuestions />,
    label: 'Trắc Nghiệm',
    path: 'multiple-choice-quiz',
    disabled: true,
    children: [],
  },
  {
    icon: <FcParallelTasks />,
    label: 'Quản lý tài sản thiết bị',
    path: 'asset-equipment-management',
    disabled: true,
    children: [],
  },
  {
    icon: <FcDepartment />,
    label: 'Quản lý kí túc xá',
    path: 'dormitory-management',
    Component: Lazy(lazy(() => import('@renderer/pages/quan-li-ktx/quanliktx'))),
    children: [
      {
        label: 'Danh sách sinh viên',
        icon: <FcBusinessman />,
        path: 'dormitory-student-list',
        children: [
          {
            label: 'Danh sách đơn sinh viên',
            icon: <FcFolder />,
            path: 'don-sinh-vien',
            Component: Lazy(lazy(() => import('@renderer/pages/quan-li-ktx/DanhSachDonSinhVien'))),
          },
          {
            label: 'Thông tin sinh viên kí túc xá',
            icon: <FcFolder />,
            path: 'ttsv',
            Component: Lazy(lazy(() => import('@renderer/pages/quan-li-ktx/ThongTinSinhVienKtx'))),
          },
          {
            label: 'Danh sách vi phạm',
            icon: <FcFolder />,
            path: 'danh-sach-vi-pham',
            Component: Lazy(lazy(() => import('@renderer/pages/quan-li-ktx/DanhSachViPham'))),
          },
        ],
      },
      {
        label: 'Cơ sở vật chất',
        icon: <FcHome />,
        path: 'facilities-management',
        children: [
          {
            label: 'Tòa nhà',
            icon: <FcFolder />,
            path: 'toa-nha',
            Component: Lazy(lazy(() => import('@renderer/pages/quan-li-ktx/ToaNha'))),
          },
          {
            label: 'Phòng',
            icon: <FcFolder />,
            path: 'phong-ktx',
            Component: Lazy(lazy(() => import('@renderer/pages/quan-li-ktx/phongktx'))),
          },
          {
            label: 'Giường',
            icon: <FcFolder />,
            path: 'giuong-ktx',
            Component: Lazy(lazy(() => import('@renderer/pages/quan-li-ktx/giuongktx'))),
          },
        ],
      },
      {
        label: 'Chỉ số điện - nước',
        icon: <FcFullBattery />,
        path: 'utilities',
        children: [
          {
            label: 'Nhập & chốt chỉ số hàng tháng',
            icon: <FcFolder />,
            path: 'input-meters',
            Component: Lazy(lazy(() => import('@renderer/pages/quan-li-ktx/ChiSoDienNuoc'))),
          },
        ],
      },
    ],
  },
  {
    icon: <FcSettings />,
    label: 'Quản trị hệ thống',
    path: 'system-administration',
    disabled: true,
    children: [],
  },
];

export const appRoutes = generateFullPath(_appRoutes);
export const routes = [
  {
    path: '/',
    Component: Lazy(lazy(() => import('@renderer/layout/Layout'))),
    children: [
      {
        icon: <FcBusinessman />,
        label: 'Đăng nhập',
        path: 'login',
        Component: Lazy(lazy(() => import('@renderer/pages/Login'))),
      },
      ...appRoutes,
    ],
  },
];

export const createRouter = () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });

  return createElement(RouterProvider, { router });
};
