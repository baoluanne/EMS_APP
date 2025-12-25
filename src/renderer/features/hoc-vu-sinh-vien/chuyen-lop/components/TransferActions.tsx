import { Button, ButtonGroup } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useFormContext, useWatch } from 'react-hook-form';
import { LoaiChuyenLop } from '@renderer/features/hoc-vu-sinh-vien/chuyen-lop/types';

interface Props {
  onTransferStudents: () => void;
}

export const TransferActions = (props: Props) => {
  const { lopCu, lopMoi, sinhVienLopCu, sinhVienLopMoi } = useWatch();
  const formContext = useFormContext();
  const handleTransferLopCuToLopMoi = () => {
    formContext.setValue('loaiChuyenLop', LoaiChuyenLop.LopCuSangLopMoi);
    props.onTransferStudents();
  };

  const handleTransferLopMoiToLopCu = () => {
    formContext.setValue('loaiChuyenLop', LoaiChuyenLop.LopMoiSangLopCu);
    props.onTransferStudents();
  };

  return (
    <ButtonGroup orientation="vertical">
      <Button disabled={!sinhVienLopMoi.length || !lopCu} onClick={handleTransferLopMoiToLopCu}>
        <ArrowBackIcon />
      </Button>
      <Button disabled={!sinhVienLopCu.length || !lopMoi} onClick={handleTransferLopCuToLopMoi}>
        <ArrowForwardIcon />
      </Button>
    </ButtonGroup>
  );
};
