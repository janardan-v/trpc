import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";

import { createContext } from "./context";
import { userService } from "./services";

export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});

export const router = tRPCContext.router;

export const publicProcedure = tRPCContext.procedure;

export const authenticatedProcedure = tRPCContext.procedure.use(async options => {
  const { ctx } = options
  let accessToken = ctx.getCookie("access-Token")

  if (!accessToken) {
    try {
      const refreshToken = ctx.getCookie("refresh-Token")
      const { id, accessToken, refreshToken: newRefreshToken } = await userService.refreshTokenService({ refreshToken })

      ctx.createCookie("refresh-Token", newRefreshToken)
      ctx.createCookie("access-Token", accessToken)

    } catch (error) {
      throw new Error("No refresh token found, login again")
    }
  }
  accessToken = ctx.getCookie("access-Token")

  const { id } = await userService.verifyAndDecodeUserToken({ token: accessToken })


  return options.next({
    ctx: {
      ...ctx,
      user: { id }
    }

  })

})
