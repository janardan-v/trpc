import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/schema";
import { env } from "../env";
import {
  type LoginWithEmailAndPasswordInputType,
  type CreateUserWithEmailAndPasswordInputType,
  type CreateUserWithEmailAndPasswordOutputType,
  type GenerateUserTokenInputType,
  type LogoutUserInputType,
  type VerifyUserTokenInputType,
  type VerifyUserTokenOutputType,
  type RefreshTokenInputType
} from "./model";
import {
  createUserWithEmailAndPasswordInput,
  createUserWithEmailAndPasswordOutput,
  generateUserTokenInput,
  loginWithEmailAndPasswordInput,
  loginWithEmailAndPasswordOutput,
  logoutUserInput,
  verifyUserTokenInput,
  verifyUserTokenOutput,
  refreshTokenInput
} from "./model";
import crypto from "node:crypto";
import * as JWT from "jsonwebtoken"



class UserService {

  // <---- Private Functions ---->

  private async getUserWithEmail(email: string) {
    const emailUser = await db.select().from(usersTable).where(eq(usersTable.email, (email)))

    if (emailUser.length === 0 || !emailUser) return null

    return emailUser[0]
  }

  private async generateAccessToken(payload: GenerateUserTokenInputType) {
    const { data } = generateUserTokenInput.safeParse(payload)
    if (!data || !data.id) throw new Error("Invalid payload to generate token")
    const { id } = data
    const accessToken = JWT.sign(
      { id },
      env.ACCESS_SECRET as JWT.Secret,
      { expiresIn: env.ACCESS_EXPIRES_IN as JWT.SignOptions["expiresIn"] }
    )
    return { accessToken }
  }

  private async verifyAccessToken(payload: VerifyUserTokenInputType) {
    const result =
      verifyUserTokenInput.safeParse(payload)

    if (!result.success)
      throw new Error(result.error.message)

    const { token } = result.data
    try {

      const decoded = JWT.verify(token,
        env.ACCESS_SECRET as JWT.Secret,
      ) as JWT.JwtPayload & {
        id: string
      }

      return {
        userId: decoded.id
      }
    } catch {
      throw new Error("Invalid access token")
    }
  }

  private async verifyRefreshToken(payload: VerifyUserTokenInputType) {
    const result =
      verifyUserTokenInput.safeParse(payload)

    if (!result.success)
      throw new Error(result.error.message)
    try {
      const { token } = result.data
      const decoded = JWT.verify(token,
        env.REFRESH_SECRET as JWT.Secret,
      ) as JWT.JwtPayload & {
        id: string
      }
      return {
        userId: decoded.id
      }
    } catch {
      throw new Error("Invalid refresh token")
    }
  }

  private async generateRefreshToken(payload: GenerateUserTokenInputType) {
    const { data } = generateUserTokenInput.safeParse(payload)
    if (!data || !data.id) throw new Error("Invalid payload to generate token")
    const { id } = data
    const refreshToken = JWT.sign(
      { id },
      env.REFRESH_SECRET as JWT.Secret,
      { expiresIn: env.REFRESH_EXPIRES_IN as JWT.SignOptions["expiresIn"] }
    )
    return { refreshToken }
  }

  private async generateVerificationToken(payload: GenerateUserTokenInputType) {
    const { data } = generateUserTokenInput.safeParse(payload)
    if (!data || !data.id) throw new Error("Invalid payload to generate token")
    const { id } = data
    const verificationToken = JWT.sign(
      { id },
      env.VERIFICATION_SECRET as JWT.Secret,
      { expiresIn: env.VERIFICATION_EXPIRES_IN as JWT.SignOptions["expiresIn"] }
    )
    return { verificationToken }
  }

  private async generateHash(salt: string, password: string) {
    const hash = crypto.createHmac("sha-256", salt).update(password).digest("hex")
    return hash
  }

  private async getUserInfoById(id: string) {
    const user = await db.select({
      id: usersTable.id,
      fullname: usersTable.fullname,
      email: usersTable.email,

    }).from(usersTable).where(eq(usersTable.id, id))

    if (user.length === 0 || !user || !user[0]) throw new Error("User with this id not exits")

    return user[0]
  }

  // <---- Public Functions ---->

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInputType) {

    const result = createUserWithEmailAndPasswordInput.safeParse(payload)

    if (!result.success) throw new Error(result.error.message)

    const emailUserSelect = await this.getUserWithEmail(payload.email)

    if (emailUserSelect) {
      throw new Error("User already exists")
    }

    const salt = crypto.randomBytes(16).toString("hex")
    const hashedPassword = await this.generateHash(salt, payload.password)

    const createdUser = await db.insert(usersTable).values({
      email: payload.email,
      fullname: payload.fullname,
      password: hashedPassword,
      salt
    }).returning({
      id: usersTable.id
    })

    if (!createdUser || createdUser.length === 0 || !createdUser[0]?.id) throw new Error("Something went wrong while inserting user to db")

    const userId = createdUser[0].id
    const { verificationToken } = await this.generateVerificationToken({ id: userId })

    return {
      id: userId,
      verificationToken
    }
  }

  public async loginWithEmailAndPassword(payload: LoginWithEmailAndPasswordInputType) {

    const result = loginWithEmailAndPasswordInput.safeParse(payload)

    if (!result.success) throw new Error(result.error.message)

    const emailUserSelect = await this.getUserWithEmail(payload.email)

    if (!emailUserSelect) {
      throw new Error("User with this email do not exists")
    }
    if (!emailUserSelect.password || !emailUserSelect.salt) {
      throw new Error("Invalid authentication method")
    }

    const salt = emailUserSelect.salt
    const hashedPassword = await this.generateHash(salt, payload.password)

    if (hashedPassword !== emailUserSelect.password) throw new Error("Invalid credentials")

    const { refreshToken } = await this.generateRefreshToken({ id: emailUserSelect.id })
    const { accessToken } = await this.generateAccessToken({ id: emailUserSelect.id })

    const updateUser = await db.update(usersTable).set({
      refreshToken,
    }).where(eq(usersTable.id, emailUserSelect.id)).returning({
      id: usersTable.id
    })

    if (!updateUser || updateUser.length === 0 || !updateUser[0]?.id) throw new Error("Something went wrong while updating user to db")

    const userId = updateUser[0].id


    return {
      id: userId,
      accessToken,
      refreshToken
    }
  }

  public async logoutUser(payload: LogoutUserInputType) {

    let userId: string

    try {
      const access = await this.verifyAccessToken({ token: payload.accessToken })
      userId = access.userId
    } catch {

      const refresh = await this.verifyRefreshToken({ token: payload.refreshToken })
      userId = refresh.userId
    }

    await db.update(usersTable).set({ refreshToken: null }).where(eq(usersTable.id, userId))

    return {
      success: true
    }
  }

  public async refreshTokenService(payload: RefreshTokenInputType) {
    const result = refreshTokenInput.safeParse(payload)

    if (!result.success) {
      console.log(result.error.message);
      throw new Error("Invalid refresh token, please login again")
    }

    const decoded = await this.verifyRefreshToken({ token: result.data.refreshToken })

    const { accessToken: newAccessToken } = await this.generateAccessToken({ id: decoded.userId })
    const { refreshToken: newRefreshToken } = await this.generateRefreshToken({ id: decoded.userId })

    const updateUser = await db.update(usersTable).set({
      refreshToken: newRefreshToken
    }).where(eq(usersTable.id, decoded.userId)).returning({
      id: usersTable.id
    })

    if (!updateUser || updateUser.length === 0 || !updateUser[0]?.id)
      throw new Error("Refreshing token failed due to internal server error");

    return {
      id: updateUser[0].id,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  }

  public async verifyAndDecodeUserToken(payload: VerifyUserTokenInputType) {
    const data = await this.verifyAccessToken(payload)

    const userInfo = await this.getUserInfoById(data.userId)

    return {
      ...userInfo
    }
  }
}

export default UserService;
