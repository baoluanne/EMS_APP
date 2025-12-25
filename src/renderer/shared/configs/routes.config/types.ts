import { ObjectValues } from '@renderer/shared/types';
import { PageKeys } from './enums';

export type PageKeyType = ObjectValues<typeof PageKeys>;

export type PagesConfig = Record<
  PageKeyType,
  {
    path: string;
    label?: string;
  }
>;

export interface NavigatorTab {
  id: string;
  label: string;
  path: string;
}
