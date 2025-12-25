import { FormHelperText, Stack, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

interface UnControlledTextFieldProps extends Omit<TextFieldProps, 'name'> {
    name: string;
    label?: React.ReactNode;
    flex?: number;
    required?: boolean;
    errorMessage?: string;
}

export const UnControlledTextField = ({
    name,
    label,
    flex = 1,
    required,
    value,
    onChange,
    error,
    errorMessage,
    ...rest
}: UnControlledTextFieldProps) => {
    return (
        <Stack flex={flex}>
            <TextField
                name={name}
                value={value ?? ''}
                error={!!error}
                size="small"
                required={required}
                label={label}
                variant="outlined"
                onChange={onChange}
                sx={{
                    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                        padding: '0 !important',
                        margin: '0 !important',
                    },
                }}
                {...rest}
            />
            {error && errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
        </Stack>
    );
};
