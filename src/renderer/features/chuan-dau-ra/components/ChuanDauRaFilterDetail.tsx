import { Stack, Box } from '@mui/material';
import {
  BacDaoTaoSelection,
  CoSoSelection,
  KhoaHocSelection,
  LoaiDaoTaoSelection,
} from '@renderer/components/selections';
import { ChuanDauRaFilterState } from '../types';

// Interface for filter state

interface ChuanDauRaFilterDetailsProps {
  filter: ChuanDauRaFilterState;
  setFilter: (val: ChuanDauRaFilterState) => void;
}

export const ChuanDauRaFilterTop = ({ filter, setFilter }: ChuanDauRaFilterDetailsProps) => {
  return (
    <Stack direction="row" spacing={2} mb={2} flexWrap="wrap" width="100%">
      <Box flex={1} minWidth={180}>
        <CoSoSelection onChange={(val) => setFilter({ idCoSo: val })} value={filter.idCoSo} />
      </Box>
      <Box flex={1} minWidth={180}>
        <BacDaoTaoSelection
          onChange={(val) => setFilter({ idBacDaoTao: val })}
          value={filter.idBacDaoTao}
        />
      </Box>
      <Box flex={1} minWidth={180}>
        <KhoaHocSelection
          onChange={(val) => setFilter({ idKhoaHoc: val })}
          value={filter.idKhoaHoc}
        />
      </Box>
      <Box flex={1} minWidth={180}>
        <LoaiDaoTaoSelection
          onChange={(val) => setFilter({ idLoaiDaoTao: val })}
          value={filter.idLoaiDaoTao}
        />
      </Box>
    </Stack>
  );
};
