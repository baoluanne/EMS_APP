import { generateStore } from '../lib/store';
import { AuthTokens, User } from '../types';

interface AuthState extends AuthTokens {
  user: User | null;
  isRemember: string | boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isRemember: false,
};

export const useAuthStore = generateStore({
  state: () => initialState,
  getters: (state) => ({
    isAuth: !!state.user,
  }),
  actions: (set) => ({
    reset: () => set(initialState),
    setUser: (user: User | null) => {
      set({ user });
    },
  }),
});
