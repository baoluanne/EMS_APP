import { format } from 'date-fns';

export const dateCellFormat = (value: string | Date) => (value ? format(value, 'dd/MM/yyyy') : '');
