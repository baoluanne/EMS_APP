import { ChungChi } from "@renderer/features/chung-chi";
import { DanhMucLoaiHinhDaoTao } from "@renderer/features/danh-muc-loai-hinh-dao-tao";
import { LoaiChungChi } from "@renderer/features/loai-chung-chi";
import { BacDaoTao, CoSoTaoDao, KhoaHoc, Option } from "@renderer/shared/types";

export const ChuanDauRaFilters = [{
  key: 'idCoSo',
  queryKey: 'CoSoDaoTao',
  label: 'Cơ Sở',
  mapper: (data: CoSoTaoDao[]): Option[] =>
    data.map((item) => ({ label: item.tenCoSo, value: item.id! })),
}, {
  key: 'idKhoaHoc',
  queryKey: 'KhoaHoc',
  label: 'Khóa Học',
  mapper: (data: KhoaHoc[]): Option[] =>
    data.map((item) => ({ label: item.tenKhoaHoc, value: item.id! })),
}, {
  key: 'idBacDaoTao',
  queryKey: 'BacDaoTao',
  label: 'Bậc Đào Tạo',
  mapper: (data: BacDaoTao[]): Option[] =>
    data.map((item) => ({ label: item.tenBacDaoTao, value: item.id! })),
}, {
  key: 'idLoaiDaoTao',
  queryKey: 'LoaiDaoTao',
  label: 'Loại Đào Tạo',
  mapper: (data: DanhMucLoaiHinhDaoTao[]): Option[] =>
    data.map((item) => ({ label: item.tenLoaiDaoTao, value: item.id! })),
}, {
  key: 'idLoaiChungChi',
  queryKey: 'LoaiChungChi',
  label: 'Loại Chứng Chỉ',
  mapper: (data: LoaiChungChi[]): Option[] =>
    data.map((item) => ({ label: item.tenLoaiChungChi, value: item.id! })),
}, {
  key: 'idChungChi',
  queryKey: 'ChungChi',
  label: 'Chứng Chỉ',
  mapper: (data: ChungChi[]): Option[] =>
    data.map((item) => ({ label: item.tenLoaiChungChi, value: item.id! })),
}];