import { string, z } from "zod";

export const createUserWithEmailAndPasswordInput = z.object({
  fullname: z.string().describe("Full name of the user"),
  email: z.email().describe("Email of the user"),
  password: z.string().min(8).describe("Password of the user, optional if using google auth type"),
  // phoneNumber: z.string().describe("Mobile number of the user"),
  // profileImageUrl: z.string().optional().describe("URL of profile image of the user, optional may add later in profile"),
})

export type CreateUserWithEmailAndPasswordInputType = z.infer<typeof createUserWithEmailAndPasswordInput>


export const createUserWithEmailAndPasswordOutput = z.object({
  id: string().describe("ID of the user"),
  // fullname: string().describe("Full name of the user"),
  // email: string().describe("Email of the user"),
  // phoneNumber: string().describe("mobile number of the user"),
  // profileImageUrl: string().optional().describe("URL of profile image of the user, optional (if user not added it)"),
})

export type CreateUserWithEmailAndPasswordOutputType = z.infer<typeof createUserWithEmailAndPasswordOutput>


