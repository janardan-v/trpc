import { TRPCError } from "@trpc/server";
import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
  getLoggedInUserInfoOutptModel,
  loginUserWithEmailAndPasswordInputModel,
  loginUserWithEmailAndPasswordOutputModel,
  logoutUserOutputModel,
  refreshTokenOutputModel,
  updateUserProfileInputModel,
  updateUserProfileOutputModel,
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
        tags: TAGS,
      },
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      try {
        const { fullname, email, password } = input;
        const { id, verificationToken } = await userService.createUserWithEmailAndPassword({
          fullname,
          email,
          password,
        });

        setAuthenticationCookie(ctx, verificationToken, "verification-Token");
        return {
          id,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error instanceof Error ? error.message : "Failed to create user",
        });
      }
    }),

  loginWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/login-with-email-and-password"),
        tags: TAGS,
      },
    })
    .input(loginUserWithEmailAndPasswordInputModel)
    .output(loginUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      try {
        const { id, accessToken, refreshToken } = await userService.loginWithEmailAndPassword(input);

        setAuthenticationCookie(ctx, accessToken, "access-Token");
        setAuthenticationCookie(ctx, refreshToken, "refresh-Token");

        return {
          id,
        };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error instanceof Error ? error.message : "Login failed",
        });
      }
    }),

  updateProfile: authenticatedProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: getPath("/update-profile"),
        protect: true,
        tags: TAGS,
      },
    })
    .input(updateUserProfileInputModel)
    .output(updateUserProfileOutputModel)
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await userService.updateUserProfile({
          ...input,
          userId: ctx.user.id,
        });

        return result;
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error instanceof Error ? error.message : "Failed to update profile",
        });
      }
    }),

  logoutUser: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/logout-user"),
        tags: TAGS,
      },
    })
    .output(logoutUserOutputModel)
    .mutation(async ({ ctx }) => {
      try {
        const accessToken = ctx.getCookie("access-Token");
        const refreshToken = ctx.getCookie("refresh-Token");
        const result = await userService.logoutUser({ accessToken, refreshToken });
        ctx.clearCookie("access-Token");
        ctx.clearCookie("refresh-Token");

        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to logout",
        });
      }
    }),

  refreshTokenService: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/refresh-token"),
        tags: TAGS,
      },
    })
    .output(refreshTokenOutputModel)
    .mutation(async ({ ctx }) => {
      try {
        const refreshToken = ctx.getCookie("refresh-Token");

        if (!refreshToken) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "No refresh token found",
          });
        }
        const {
          id,
          accessToken,
          refreshToken: newRefreshToken,
        } = await userService.refreshTokenService({ refreshToken });

        ctx.createCookie("refresh-Token", newRefreshToken);
        ctx.createCookie("access-Token", accessToken);

        return {
          id,
          accessToken,
          refreshToken: newRefreshToken,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error instanceof Error ? error.message : "Failed to refresh token",
        });
      }
    }),

  getLoggedInUserInfo: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/get-logged-in-user-info"),
        tags: TAGS,
        protect: true,
      },
    })
    .output(getLoggedInUserInfoOutptModel)
    .query(async ({ ctx }) => {
      try {
        const { id, fullname, email } = await userService.getUserInfoById(ctx.user.id);

        return {
          id,
          fullname,
          email,
        };
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: error instanceof Error ? error.message : "User not found",
        });
      }
    }),
});
