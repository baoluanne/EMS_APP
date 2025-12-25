// Toolbar.tsx
import {
  ArrowDropDown,
  FileDownload,
  FileUpload,
  GridOn,
  Print,
  TableView,
} from '@mui/icons-material';
import { Box, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { FC, useState } from 'react';

type ExportScope = 'all' | 'selected' | 'filtered';
type PrintScope = 'all' | 'selected' | 'filtered';

export interface ToolbarProps {
  onImportStudentImages?: () => void;
  onExportStudentImages?: (scope: ExportScope) => void;
  onPrintStudentCards?: (scope: PrintScope) => void;
  onExportAccess?: () => void;
  onExportExcel?: (scope: ExportScope) => void;
  onPrint?: () => void;
  hasFilter?: boolean;
}

export const Toolbar: FC<ToolbarProps> = ({
  onImportStudentImages,
  onExportStudentImages,
  onPrintStudentCards,
  onExportAccess,
  onExportExcel,
  onPrint,
  hasFilter = false,
}) => {
  // menu anchors
  const [anchorExportImg, setAnchorExportImg] = useState<null | HTMLElement>(null);
  const [anchorPrintCard, setAnchorPrintCard] = useState<null | HTMLElement>(null);
  const [anchorExportXls, setAnchorExportXls] = useState<null | HTMLElement>(null);

  const handleScope = <T extends (scope: any) => void>(
    fn: T | undefined,
    scope: Parameters<T>[0],
    close: () => void,
  ) => {
    fn?.(scope);
    close();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        p: 1,
      }}
    >
      {/* Import hình sinh viên */}
      {!!onImportStudentImages && (
        <Button
          variant="text"
          size="small"
          startIcon={<FileUpload color="success" />}
          onClick={onImportStudentImages}
        >
          Import hình sinh viên
        </Button>
      )}

      {/* Export hình sinh viên */}
      {!!onExportStudentImages && (
        <>
          <Button
            variant="text"
            size="small"
            startIcon={<FileDownload color="warning" />}
            endIcon={<ArrowDropDown />}
            onClick={(e) => setAnchorExportImg(e.currentTarget)}
          >
            Export hình sinh viên
          </Button>
          <Menu
            anchorEl={anchorExportImg}
            open={Boolean(anchorExportImg)}
            onClose={() => setAnchorExportImg(null)}
          >
            <MenuItem
              onClick={() =>
                handleScope(onExportStudentImages, 'all', () => setAnchorExportImg(null))
              }
            >
              Tất cả
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleScope(onExportStudentImages, 'selected', () => setAnchorExportImg(null))
              }
            >
              Đã chọn
            </MenuItem>
            <MenuItem
              disabled={!hasFilter}
              onClick={() =>
                handleScope(onExportStudentImages, 'filtered', () => setAnchorExportImg(null))
              }
            >
              Theo bộ lọc hiện tại
            </MenuItem>
          </Menu>
        </>
      )}

      {/* In thẻ sinh viên */}
      {!!onPrintStudentCards && (
        <>
          <Button
            variant="text"
            size="small"
            startIcon={<Print />}
            endIcon={<ArrowDropDown />}
            onClick={(e) => setAnchorPrintCard(e.currentTarget)}
          >
            In thẻ sinh viên
          </Button>
          <Menu
            anchorEl={anchorPrintCard}
            open={Boolean(anchorPrintCard)}
            onClose={() => setAnchorPrintCard(null)}
          >
            <MenuItem
              onClick={() =>
                handleScope(onPrintStudentCards, 'all', () => setAnchorPrintCard(null))
              }
            >
              Tất cả
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleScope(onPrintStudentCards, 'selected', () => setAnchorPrintCard(null))
              }
            >
              Đã chọn
            </MenuItem>
            <MenuItem
              disabled={!hasFilter}
              onClick={() =>
                handleScope(onPrintStudentCards, 'filtered', () => setAnchorPrintCard(null))
              }
            >
              Theo bộ lọc hiện tại
            </MenuItem>
          </Menu>
        </>
      )}

      {/* Xuất Access */}
      {!!onExportAccess && (
        <Button
          variant="text"
          size="small"
          startIcon={<TableView color="secondary" />}
          onClick={onExportAccess}
        >
          Xuất Access
        </Button>
      )}

      {/* Xuất Excel */}
      {!!onExportExcel && (
        <>
          <Button
            variant="text"
            size="small"
            startIcon={<GridOn color="warning" />}
            endIcon={<ArrowDropDown />}
            onClick={(e) => setAnchorExportXls(e.currentTarget)}
          >
            Xuất Excel
          </Button>
          <Menu
            anchorEl={anchorExportXls}
            open={Boolean(anchorExportXls)}
            onClose={() => setAnchorExportXls(null)}
          >
            <MenuItem
              onClick={() => handleScope(onExportExcel, 'all', () => setAnchorExportXls(null))}
            >
              Tất cả
            </MenuItem>
            <MenuItem
              onClick={() => handleScope(onExportExcel, 'selected', () => setAnchorExportXls(null))}
            >
              Đã chọn
            </MenuItem>
            <MenuItem
              disabled={!hasFilter}
              onClick={() => handleScope(onExportExcel, 'filtered', () => setAnchorExportXls(null))}
            >
              Theo bộ lọc hiện tại
            </MenuItem>
          </Menu>
        </>
      )}

      {/* In (chung) */}
      {!!onPrint && (
        <Tooltip title="In">
          <Button variant="text" size="small" startIcon={<Print />} onClick={onPrint}>
            In
          </Button>
        </Tooltip>
      )}
    </Box>
  );
};

export default Toolbar;
