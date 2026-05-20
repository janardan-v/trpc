import { z } from "zod"

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullname: z.string().describe("Full name of the user"),
    email: z.string().describe("Email of the user"),
    password: z.string().min(8).describe("Password of the user, optional if using google auth type"),
})


export const createUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe("ID of the user"),
})

