export type LoginUserResponse = {
  accessToken: string;
};

export type JWTPayload = {
  sub: number;
  username: string;
  role: number;
};
