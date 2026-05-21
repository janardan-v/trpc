import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
  getLoggedInUserInfoOutptModel,
  loginUserWithEmailAndPasswordInputModel,
  loginUserWithEmailAndPasswordOutputModel,
  logoutUserOutputModel,
  refreshTokenOutputModel
} from "./model.js";
import { userService } from "../../services/index.js";
import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { setAuthenticationCookie } from "../../utils/cookie.js";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create-user-with-email-and-password"),
        tags: TAGS
      }
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { fullname, email, password } = input
      const { id, verificationToken } = await userService.createUserWithEmailAndPassword({ fullname, email, password })

      setAuthenticationCookie(ctx, verificationToken, "verification-Token")
      return {
        id
      };
    }),

  loginWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/login-with-email-and-password"),
        tags: TAGS
      }
    })
    .input(loginUserWithEmailAndPasswordInputModel)
    .output(loginUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id, accessToken, refreshToken } = await userService.loginWithEmailAndPassword(input)

      setAuthenticationCookie(ctx, accessToken, "access-Token")
      setAuthenticationCookie(ctx, refreshToken, "refresh-Token")

      return {
        id
      };
    }),

  logoutUser: publicProcedure.meta({
    openapi: {
      method: "POST",
      path: getPath("/logout-user"),
      tags: TAGS
    }
  })
    .output(logoutUserOutputModel)
    .mutation(async ({ ctx }) => {
      const accessToken = ctx.getCookie("access-Token")
      const refreshToken = ctx.getCookie("refresh-Token")
      const result = await userService.logoutUser({ accessToken, refreshToken })
      ctx.clearCookie("access-Token")
      ctx.clearCookie("refresh-Token")

      return result
    }),
  refreshTokenService: publicProcedure.meta({
    openapi: {
      method: "POST",
      path: getPath("/refresh-token"),
      tags: TAGS
    }
  })
    .output(refreshTokenOutputModel)
    .mutation(async ({ ctx }) => {
      const refreshToken = ctx.getCookie("refresh-Token")

      if (!refreshToken) {
        throw new Error("No refresh token found")
      }
      userService.refreshTokenService({ refreshToken })
      const input = ctx.getCookie("refresh-Token")
      const { id, accessToken, refreshToken: newRefreshToken } = await userService.refreshTokenService({ refreshToken: input })

      ctx.createCookie("refresh-Token", newRefreshToken)
      ctx.createCookie("access-Token", accessToken)

      return {
        id,
        accessToken,
        refreshToken: newRefreshToken
      }
    }),
  getLoggedInUserInfo: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/get-logged-in-user-info"),
        protect:true
      }
    })
    .output(getLoggedInUserInfoOutptModel)
    .query(async ({ ctx }) => {

      const { id, fullname, email } = await userService.getUserInfoById(ctx.user.id)

      return {
        id,
        fullname,
        email
      }
    })
})


