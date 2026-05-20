import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/schema";
import { env } from "../env";
import { type CreateUserWithEmailAndPasswordInputType, type CreateUserWithEmailAndPasswordOutputType } from "./model";
import { createUserWithEmailAndPasswordInput, createUserWithEmailAndPasswordOutput } from "./model";
import crypto from "node:crypto";



class UserService {


  private async getUserWithEmail(email: string) {
    const emailUser = await db.select().from(usersTable).where(eq(usersTable.email, (email)))

    if (emailUser.length === 0 || !emailUser) return null

    return emailUser[0]

  }

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInputType) {

    const result = await createUserWithEmailAndPasswordOutput.parseAsync(payload)

    const emailUserSelect = await this.getUserWithEmail(payload.email)

    if (emailUserSelect) {
      throw new Error("User already exists")
    }

    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.createHmac("sha-256", salt).update(payload.password).digest("hex")

    const createdUser = await db.insert(usersTable).values({
      email: payload.email,
      fullname: payload.fullname,
      password: hash,
      salt
    }).returning({
      id: usersTable.id
    })

    if (!createdUser || createdUser.length === 0 || !createdUser[0]?.id) throw new Error("Something went wrong while inserting user to db")

    return {
      id: createdUser[0].id
    }

  }
}

export default UserService;
