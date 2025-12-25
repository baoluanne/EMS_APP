import { useState, useMemo } from 'react';
import {
  DialogActions,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
  Alert,
  AlertTitle,
  Box,
} from '@mui/material';
import { FileUpload, CloudUpload, CheckCircle, Cancel, Download } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { FormDetailsModal } from '@renderer/components/modals';
import { useImportMutation } from '@renderer/shared/mutations/import.mutation';
import { DataGridTable } from '@renderer/components/Table';
import { ImportExcelProps, NormalizedResult } from '@renderer/shared/types';
import { buildRows, fileToBase64, normalizeResult } from '@renderer/shared/utils/import-excel';
import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { TITLE_MODE } from '@renderer/shared/enums';

/** Build DataGrid columns */
const buildColumns = (baseColumns: GridColDef[]): GridColDef[] => [
  { field: 'rowNumber', headerName: 'Dòng', width: 60 },
  ...baseColumns,
  {
    field: 'status',
    headerName: 'Kết quả',
    minWidth: 120,
    renderCell: (params) => (
      <Chip
        label={params.value === 'success' ? 'Thành công' : 'Thất bại'}
        color={params.value === 'success' ? 'success' : 'error'}
        size="small"
        icon={params.value === 'success' ? <CheckCircle /> : <Cancel />}
        sx={{ fontWeight: 500 }}
      />
    ),
  },
  {
    field: 'errorMessage',
    headerName: 'Thông tin lỗi',
    minWidth: 150,
    flex: 1,
    renderCell: (params) => (
      <Typography
        variant="body2"
        color="error.main"
        sx={{
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          fontStyle: params.value ? 'italic' : 'normal',
        }}
      >
        {params.value || ''}
      </Typography>
    ),
  },
];

export const ImportExcel = ({
  title,
  columns,
  entity,
  onSuccess,
  sampleFilePath,
  buttonTitle = 'Import Excel',
}: ImportExcelProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<NormalizedResult | null>(null);

  const mutation = useImportMutation<any, any>(entity);

  const handleClose = () => {
    setOpenDialog(false);
    setFile(null);
    setResult(null);
  };
  const handleCompleted = () => {
    onSuccess?.();
    handleClose();
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      const res = await mutation.mutateAsync({ file: base64 });
      const normalized = normalizeResult(res);
      setResult(normalized);
      toast.success('Import hoàn tất');
    } catch (err) {
      console.error(err);
      toast.error('Import thất bại');
    } finally {
      setFile(null);
      const input = document.getElementById('fileInput') as HTMLInputElement | null;
      if (input) input.value = '';
    }
  };

  const mappedRows = useMemo(() => buildRows(result), [result]);
  const filteredColumns = useMemo(() => buildColumns(columns), [columns]);

  const handleDownload = async (fileName: string) => {
    const result = await window.electronAPI.downloadResourceFile(fileName);
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };
  return (
    <>
      <Button
        size="small"
        startIcon={<FileUpload />}
        onClick={() => setOpenDialog(true)}
        variant="text"
        sx={{ borderRadius: 2, textTransform: 'none' }}
      >
        {buttonTitle}
      </Button>

      {openDialog && (
        <FormDetailsModal
          title={title}
          onClose={handleClose}
          titleMode={TITLE_MODE.COLORED}
          maxWidth="sm"
        >
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px dashed',
              borderColor: file ? 'primary.main' : 'grey.400',
              bgcolor: file ? 'primary.50' : 'grey.50',
              cursor: 'pointer',
              textAlign: 'center',
              transition: '0.3s',
              '&:hover': { bgcolor: 'grey.100' },
            }}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <input
              type="file"
              id="fileInput"
              accept=".xlsx,.xls"
              hidden
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <CloudUpload sx={{ fontSize: 50, color: file ? 'primary.main' : 'grey.500', mb: 1 }} />
            <Typography variant="body1" fontWeight={500}>
              {file ? `📂 Đã chọn: ${file.name}` : 'Chọn file Excel để import'}
            </Typography>
          </Paper>

          {!!sampleFilePath && (
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="text"
                startIcon={<Download />}
                color="primary"
                onClick={() => handleDownload(sampleFilePath)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Tải file Excel mẫu
              </Button>
            </Stack>
          )}

          {/* Result Summary */}
          {result && (
            <Stack spacing={2} justifyContent="center">
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" color="primary" align="center" sx={{ fontWeight: 700 }}>
                📊 Kết quả Import
              </Typography>
              {!result.success && (
                <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>
                  <AlertTitle>Lỗi Import</AlertTitle>
                  {result.errorMessage}
                </Alert>
              )}

              {result.success && (
                <>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction="row" spacing={3}>
                      <Typography variant="body2">Tổng: {result.totalRecords}</Typography>
                      <Typography variant="body2" color="success.main">
                        Thành công: {result.successRecords}
                      </Typography>
                      <Typography variant="body2" color="error.main">
                        Thất bại: {result.failedRecords}
                      </Typography>
                    </Stack>
                  </Paper>
                  <Box sx={{ mt: 2 }}>
                    <DataGridTable
                      rows={mappedRows}
                      columns={filteredColumns}
                      height={400}
                      getRowHeight={() => 'auto'}
                      sx={{
                        boxShadow: 2,
                        borderRadius: 2,
                        '& .MuiDataGrid-columnHeaders': {
                          bgcolor: 'primary.100',
                          fontWeight: 600,
                        },
                        '& .MuiDataGrid-cell': {
                          display: 'flex',
                          alignItems: 'center',
                          whiteSpace: 'normal !important',
                          wordBreak: 'break-word',
                          lineHeight: '1.4em',
                          py: 1,
                        },
                      }}
                    />
                  </Box>
                </>
              )}
            </Stack>
          )}

          <DialogActions sx={{ px: 0, pt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2 }}>
              Hủy
            </Button>
            {(file || !result || result.failedRecords >= 0) && (
              <Button
                onClick={handleUpload}
                color="primary"
                variant="contained"
                disabled={!file}
                sx={{ borderRadius: 2 }}
              >
                Import
              </Button>
            )}
            {result && result.successRecords > 0 && (
              <Button
                onClick={handleCompleted}
                color="success"
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Hoàn tất
              </Button>
            )}
          </DialogActions>
        </FormDetailsModal>
      )}
    </>
  );
};
