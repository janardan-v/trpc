import { z } from "zod";

export const createUserWithEmailAndPasswordInput = z.object({
  fullname: z.string().describe("Full name of the user"),
  email: z.email().describe("Email of the user"),
  password: z.string().min(8).describe("Password of the user, optional if using google auth type"),
  // phoneNumber: z.string().describe("Mobile number of the user"),
  // profileImageUrl: z.string().optional().describe("URL of profile image of the user, optional may add later in profile"),
});

export type CreateUserWithEmailAndPasswordInputType = z.infer<
  typeof createUserWithEmailAndPasswordInput
>;

export const createUserWithEmailAndPasswordOutput = z.object({
  id: z.string().describe("ID of the user"),
});

export type CreateUserWithEmailAndPasswordOutputType = z.infer<
  typeof createUserWithEmailAndPasswordOutput
>;

export const loginWithEmailAndPasswordInput = z.object({
  email: z.email().describe("Email of the user"),
  password: z.string().min(8).describe("Password of the user, optional if using google auth type"),
});

export type LoginWithEmailAndPasswordInputType = z.infer<typeof loginWithEmailAndPasswordInput>;

export const loginWithEmailAndPasswordOutput = z.object({
  id: z.string().describe("ID of the user"),
});

export type LoginWithEmailAndPasswordOutputType = z.infer<typeof loginWithEmailAndPasswordOutput>;

export const updateUserProfileInput = z.object({
  userId: z.uuid(),
  fullname: z.string().optional(),
  email: z.email().optional(),
  password: z.string().min(8).optional(),
});

export type UpdateUserProfileInputType = z.infer<typeof updateUserProfileInput>;

export const logoutUserInput = z.object({
  accessToken: z.string().describe("Access token of the user"),
  refreshToken: z.string().describe("Access token of the user"),
});

export type LogoutUserInputType = z.infer<typeof logoutUserInput>;

export const generateUserTokenInput = z.object({
  id: z.string().describe("ID of the user"),
});

export type GenerateUserTokenInputType = z.infer<typeof generateUserTokenInput>;

export const verifyUserTokenInput = z.object({
  token: z.string().describe("Token of the user"),
});

export type VerifyUserTokenInputType = z.infer<typeof verifyUserTokenInput>;

export const verifyUserTokenOutput = z.object({
  token: z.string().describe("Token of the user"),
});

export type VerifyUserTokenOutputType = z.infer<typeof verifyUserTokenOutput>;

export const refreshTokenInput = z.object({
  refreshToken: z.string().describe("Refresh Token of the user"),
});
export type RefreshTokenInputType = z.infer<typeof refreshTokenInput>;
