import { ChiTietChuongTrinhKhung_NienChe } from './validation';

export function validateAndCleanChiTietKhung(
  chiTietKhungHocKyTinChis: ChiTietChuongTrinhKhung_NienChe[],
) {
  const hocKyRows = chiTietKhungHocKyTinChis.filter((item) => !item.idMonHocBacDaoTao);
  const errors: string[] = [];
  for (const hocKyRow of hocKyRows) {
    const hocKy = hocKyRow.hocKy;
    const monHocRows = chiTietKhungHocKyTinChis.filter(
      (item) => item.idMonHocBacDaoTao && item.hocKy === hocKy,
    );

    const monHocBatBuoc = monHocRows.filter((x) => x.isBatBuoc);
    const monHocTuChon = monHocRows.filter((x) => !x.isBatBuoc);

    if (monHocBatBuoc.length === 0 && monHocTuChon.length === 0) {
      errors.push(`Học kỳ ${hocKy} không có môn học nào (bắt buộc hoặc tự chọn).`);
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  const cleanedList = chiTietKhungHocKyTinChis
    .filter((item) => !!item.idMonHocBacDaoTao)
    .map((item) => ({
      ...item,
      monHocBacDaoTao: null,
    }));
  return { valid: true, data: cleanedList };
}
