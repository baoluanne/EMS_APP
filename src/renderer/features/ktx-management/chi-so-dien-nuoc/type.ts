export interface ChiSoDienNuocFilterState {
  toaNhaId?: string;
  phongId?: string;
  thang?: number;
  nam?: number;
  daChot?: boolean;
}

export const chiSoDienNuocDefaultFilters: ChiSoDienNuocFilterState = {
  toaNhaId: undefined,
  phongId: undefined,
  thang: undefined,
  nam: undefined,
  daChot: undefined,
};
