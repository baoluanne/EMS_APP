import { Box, Button, Stack, Typography, Tooltip, LinearProgress } from '@mui/material';
import { ControlledCheckbox, ControlledTextField } from '@renderer/components/controlled-fields';
import { useForm, FormProvider } from 'react-hook-form';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DataGridTable } from '@renderer/components/Table';
import InfoSection from '@renderer/components/InfoSection';
import { ActionsToolbar } from '@renderer/components/toolbars';
import { useMutation } from '@renderer/shared/mutations';
import { InfoOutlined } from '@mui/icons-material';
import { useTableParamsSelection } from '@renderer/shared/hooks/use-table-params-selection';
import { toast } from 'react-toastify';
import {
  base64ToBlob,
  exportMultiplePaginationToExcel,
  splitIntoChunks,
  uploadChunksSequentially,
} from '@renderer/shared/utils';
import {
  defaultThongTinImportForm,
  ThongTinImportForm,
} from '@renderer/features/hoc-vu-sinh-vien/import-hinh-sinh-vien';
import {
  importFailColumns,
  importSuccessColumns,
} from '@renderer/features/hoc-vu-sinh-vien/import-hinh-sinh-vien/configs';

export default function ImportHinhSinhVien() {
  const methods = useForm<ThongTinImportForm>({
    defaultValues: defaultThongTinImportForm,
  });

  const { control, handleSubmit, reset, setValue } = methods;
  const [successRows, setSuccessRows] = useState<any[]>([]);
  const [failRows, setFailRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBrowseFolder = async () => {
    const folder = await window.electronAPI?.selectFolder?.();
    if (folder) {
      setValue('folderPath', folder);
      setValue('importTime', dayjs().format('YYYY-MM-DD HH:mm'));
    }
  };

  const { mutateAsync: ImportImagesAsync } = useMutation<any>('SinhVien/import-images');

  const handleImport = handleSubmit(async (values) => {
    if (!values.folderPath) {
      toast.error('Vui lòng chọn thư mục trước khi import.');
      return;
    }

    setLoading(true);
    setProgress(0);
    setSuccessRows([]);
    setFailRows([]);

    try {
      const result = await window.electronAPI.readFolderFiles(values.folderPath);
      if (!result?.success || !Array.isArray(result.data)) {
        toast.error(result?.message || 'Không thể đọc thư mục.');
        return;
      }

      const imageFiles = result.data.filter((f) => /\.(jpg|jpeg|png)$/i.test(f.name));
      if (imageFiles.length === 0) {
        toast.error('Không tìm thấy hình ảnh hợp lệ (.jpg, .jpeg, .png) trong thư mục.');
        return;
      }

      const CHUNK_SIZE = 50;
      const chunks = splitIntoChunks(imageFiles, CHUNK_SIZE);
      const successList: any[] = [];
      const failList: any[] = [];

      const buildFormData = (chunk: typeof imageFiles, chunkIndex: number, totalChunks: number) => {
        const formData = new FormData();
        chunk.forEach((file) => {
          const blob = base64ToBlob(file.fileBase64, 'image/*');
          formData.append('files', blob, file.name);
        });
        formData.append('chunkIndex', `${chunkIndex}`);
        formData.append('totalChunks', `${totalChunks}`);
        return formData;
      };

      const uploadFn = async (formData: FormData) => {
        const response = await ImportImagesAsync(formData);
        if (response?.successList?.length) successList.push(...response.successList);
        if (response?.failedList?.length) failList.push(...response.failedList);
      };

      await uploadChunksSequentially(chunks, buildFormData, uploadFn, setProgress);

      setSuccessRows(successList);
      setFailRows(failList);
      toast.success(`Import hoàn tất!`);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  });

  const {
    tableConfig: successTableConfig,
    generateTableConfig: generateTableConfigSuccess,
    columnVisibilityModel: columnVisibilityModelSuccess,
  } = useTableParamsSelection();

  const {
    tableConfig: failedTableConfig,
    generateTableConfig: generateTableConfigFailed,
    columnVisibilityModel: columnVisibilityModelFailed,
  } = useTableParamsSelection();

  const handleResetAll = () => {
    reset(defaultThongTinImportForm);
    setSuccessRows([]);
    setFailRows([]);
    setProgress(0);
    setLoading(false);
    toast.info('Đã làm mới toàn bộ dữ liệu.');
  };
  return (
    <FormProvider {...methods}>
      <Stack
        className="w-full h-full p-2"
        sx={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          borderRadius: 0,
        }}
      >
        <ActionsToolbar
          onExport={async (dataOption, columnOption) => {
            await exportMultiplePaginationToExcel(
              [
                {
                  sheetName: 'Danh sách thành công',
                  filteredData: successRows,
                  columns: importSuccessColumns,
                  options: { dataOption, columnOption },
                  columnVisibilityModel: columnVisibilityModelSuccess,
                },
                {
                  sheetName: 'Danh sách thất bại',
                  filteredData: failRows,
                  columns: importFailColumns,
                  options: { dataOption, columnOption },
                  columnVisibilityModel: columnVisibilityModelFailed,
                },
              ],
              'Ket_qua_import_hinh_sinh_vien',
            );
          }}
        />

        <Stack spacing={2}>
          <InfoSection
            title={
              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <FolderOpenIcon color="primary" fontSize="small" />
                Thông tin import
              </Typography>
            }
          >
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Box flex={1} minWidth={280}>
                <ControlledTextField
                  control={control}
                  name="folderPath"
                  label="Thư mục chứa hình ảnh"
                  required
                  disabled
                />
              </Box>
              <Tooltip title="Chọn thư mục hình ảnh" arrow>
                <Button
                  variant="contained"
                  startIcon={<FolderOpenIcon />}
                  onClick={handleBrowseFolder}
                >
                  Duyệt
                </Button>
              </Tooltip>
              <ControlledCheckbox
                control={control}
                name="supportBackground"
                label="Hỗ trợ nén ảnh"
              />
            </Stack>

            <Box mt={2} minWidth={250}>
              <ControlledTextField
                control={control}
                name="importTime"
                label="Thời gian import"
                disabled
              />
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              mt={2}
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: '#fffbe6',
                border: '1px solid #ffecb3',
              }}
            >
              <InfoOutlined color="warning" fontSize="small" />
              <Box>
                <Typography variant="caption" color="error">
                  * Tên file hình ảnh phải giống Mã sinh viên
                </Typography>
                <br />
                <Typography variant="caption" color="error">
                  * Hỗ trợ Import các file có định dạng .jpg, .jpeg, .png
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<RestartAltIcon />}
                sx={{ px: 3, borderRadius: 2 }}
                onClick={handleResetAll}
                disabled={loading}
              >
                Làm mới
              </Button>
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{ px: 3, borderRadius: 2 }}
                onClick={handleImport}
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Thực hiện'}
              </Button>
            </Stack>
          </InfoSection>

          {loading && (
            <Box mt={2}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Đang import... {progress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 10, borderRadius: 1 }}
              />
            </Box>
          )}

          <InfoSection
            title={
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mb={2}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <CheckCircleOutlineIcon color="success" fontSize="small" /> Kết quả import
              </Typography>
            }
          >
            <Typography fontWeight={500} mb={1} variant="subtitle2">
              Danh sách file import <span style={{ color: 'green' }}>thành công</span>
            </Typography>
            <DataGridTable
              rows={successRows}
              columns={importSuccessColumns}
              getRowId={(r) => r.maSinhVien}
              {...successTableConfig}
              {...generateTableConfigSuccess(successRows.length, false)}
              height={'calc(100% - 85px)'}
            />
            <Typography fontWeight={500} mb={1} variant="subtitle2">
              Danh sách file import <span style={{ color: 'red' }}>thất bại</span>
            </Typography>
            <DataGridTable
              rows={failRows}
              columns={importFailColumns}
              getRowId={(r) => r.tenFile}
              {...failedTableConfig}
              {...generateTableConfigFailed(successRows.length, false)}
              height={'calc(100% - 85px)'}
            />
          </InfoSection>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
