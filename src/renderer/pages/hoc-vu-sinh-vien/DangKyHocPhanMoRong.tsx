import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, ButtonGroup, Stack } from '@mui/material';
import {
  DsHocPhanDaDangKyTable,
  DsHocPhanDangMoTable,
  DangKyHocPhanMoRongFilter,
} from '@renderer/features/hoc-vu-sinh-vien/quan-ly-dang-ky-hoc-phan/dang-ky-hoc-phan-mo-rong';
import { useTableParams } from '@renderer/shared/hooks/use-table-params';
import { SinhVien } from '@renderer/shared/types/sinh-vien.types';
import { useState } from 'react';

export default function DangKyHocPhanMoRong() {
  const { params, mergeParams, generateTableConfig } = useTableParams();
  const [selectedSV, setSelectedSV] = useState<SinhVien[]>([]);
  const [currentTransferSVs, setCurrentTransferSVs] = useState<SinhVien[]>([]);

  const openTransferModal = (listSV: SinhVien[]) => {
    setSelectedSV(listSV);
  };

  const handleTransfer = () => {
    setCurrentTransferSVs((prev) => {
      const newTransferSVs = [...prev, ...selectedSV];
      mergeParams({
        excludeIds: newTransferSVs.map((item) => item.id),
      });
      return newTransferSVs;
    });
    setSelectedSV([]);
  };

  return (
    <Stack
      className="w-full h-full p-2"
      style={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        borderRadius: '0px',
      }}
      gap={1}
    >
      <DangKyHocPhanMoRongFilter onApply={(value) => mergeParams(value)} />
      <Stack className="w-full h-full" direction="row" gap={1}>
        <DsHocPhanDangMoTable
          params={params}
          generateTableConfig={generateTableConfig}
          onSelectedRowsChanged={openTransferModal}
          selectedSV={selectedSV}
        />
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonGroup orientation="vertical">
            <Button>
              <ArrowBackIcon />
            </Button>
            <Button onClick={handleTransfer}>
              <ArrowForwardIcon />
            </Button>
          </ButtonGroup>
        </Stack>
        <DsHocPhanDaDangKyTable
          tableTitle="Danh sách học phần đã đăng ký"
          transferSVs={currentTransferSVs}
        />
      </Stack>
    </Stack>
  );
}