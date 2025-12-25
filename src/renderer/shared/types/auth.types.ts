export interface RefreshTokenResponse {
  accessToken: string;
}

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}
