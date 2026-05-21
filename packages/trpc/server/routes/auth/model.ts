import { z } from "zod"

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullname: z.string().describe("Full name of the user"),
    email: z.email().describe("Email of the user"),
    password: z.string().min(8).describe("Password of the user, optional if using google auth type"),
})

export const createUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe("ID of the user"),
})

export const loginUserWithEmailAndPasswordInputModel = z.object({
    email: z.email().describe("Email of the user"),
    password: z.string().min(8).describe("Password of the user, optional if using google auth type"),
})


export const loginUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe("ID of the user"),
})


export const logoutUserOutputModel = z.object({
    success: z.boolean()
})

export const refreshTokenOutputModel = z.object({
    id: z.string().describe("ID of the user"),
    refreshToken: z.string().describe("Refresh Token of the user"),
    accessToken: z.string().describe("Access Token of the user")
})