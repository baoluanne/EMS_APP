import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Button,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from '@mui/material';
import { COLUMN_OPTIONS, ColumnOption, DATA_OPTIONS, DataOption } from '@renderer/shared/configs';
import { useState } from 'react';
import { FormDetailsModal } from '../modals';
import { TITLE_MODE } from '@renderer/shared/enums';

export const ExportExcel = ({
  onClickExport,
}: {
  onClickExport?: (
    dataOption: DataOption,
    columnOption: ColumnOption,
  ) => Promise<string | void> | void;
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  // Strongly typed state
  const [dataOption, setDataOption] = useState<DataOption>(DATA_OPTIONS.FILTERED);
  const [columnOption, setColumnOption] = useState<ColumnOption>(COLUMN_OPTIONS.VISIBLE);

  const handleExportExcel = async () => {
    if (onClickExport) {
      await onClickExport(dataOption, columnOption);
    }
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="text"
        color="success"
        startIcon={<FileDownloadIcon />}
        size="small"
        onClick={() => setOpenDialog(true)}
      >
        Xuất Excel
      </Button>

      {openDialog && (
        <FormDetailsModal
          title="Xuất Excel"
          onClose={() => setOpenDialog(false)}
          titleMode={TITLE_MODE.COLORED}
          maxWidth="xs"
        >
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <FormControl>
              <FormLabel sx={{ fontWeight: 'medium', mb: 1 }}>Chọn dữ liệu</FormLabel>
              <RadioGroup
                value={dataOption}
                onChange={(e) => setDataOption(e.target.value as DataOption)}
                className="pl-2"
              >
                <FormControlLabel
                  value={DATA_OPTIONS.FILTERED}
                  control={<Radio />}
                  label="Danh sách đã lọc"
                />
                <FormControlLabel
                  value={DATA_OPTIONS.ALL}
                  control={<Radio />}
                  label="Tất cả dữ liệu"
                />
              </RadioGroup>
            </FormControl>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <FormControl>
              <FormLabel sx={{ fontWeight: 'medium', mb: 1 }}>Chọn cột</FormLabel>
              <RadioGroup
                value={columnOption}
                onChange={(e) => setColumnOption(e.target.value as ColumnOption)}
                className="pl-2"
              >
                <FormControlLabel
                  value={COLUMN_OPTIONS.VISIBLE}
                  control={<Radio />}
                  label="Các cột đang hiển thị"
                />
                <FormControlLabel
                  value={COLUMN_OPTIONS.ALL}
                  control={<Radio />}
                  label="Tất cả các cột"
                />
              </RadioGroup>
            </FormControl>
          </Paper>
          <DialogActions sx={{ px: 0, pb: 0 }}>
            <Button onClick={() => setOpenDialog(false)} variant="text">
              Hủy
            </Button>
            <Button onClick={handleExportExcel} color="primary" variant="contained">
              Tải Xuống
            </Button>
          </DialogActions>
        </FormDetailsModal>
      )}
    </>
  );
};
