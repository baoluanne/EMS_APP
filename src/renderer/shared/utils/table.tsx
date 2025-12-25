import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { GridRenderCellParams, GridRenderEditCellParams } from '@mui/x-data-grid';

export const renderEditCellSelection = (options: string[]) => {
  const EditCell = (params: GridRenderEditCellParams) => {
    return (
      <Autocomplete
        value={params.value || ''}
        onChange={(_, newValue) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: newValue || '',
          });
        }}
        options={options}
        fullWidth
        renderInput={(paramsInput) => (
          <TextField {...paramsInput} size="small" variant="outlined" />
        )}
      />
    );
  };
  EditCell.displayName = 'EditCellAutocomplete';
  return EditCell;
};

export const renderBooleanCell = (params: GridRenderCellParams) => (
  <Checkbox checked={!!params.value} />
);

export const renderBooleanEditCell = (params: GridRenderEditCellParams) => (
  <Checkbox
    checked={!!params.value}
    onChange={(event) =>
      params.api.setEditCellValue({
        id: params.id,
        field: params.field,
        value: event.target.checked,
      })
    }
  />
);
