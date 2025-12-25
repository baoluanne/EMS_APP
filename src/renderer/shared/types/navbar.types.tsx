import { NavigatorTab } from '../configs';

export interface MenuItemChild {
  label: string;
  path?: string;
  tab?: NavigatorTab;
  hasDivider?: boolean;
}

export interface MenuItemSub {
  label: string;
  path?: string;
  tab?: NavigatorTab;
  children?: MenuItemChild[];
  hasDivider?: boolean;
}

export interface MainMenuItem {
  label: string;
  submenu: MenuItemSub[];
  disable?: boolean;
  tab?: NavigatorTab;
}
