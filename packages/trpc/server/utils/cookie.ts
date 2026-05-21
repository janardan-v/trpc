import type { CookieOptions, Request, Response } from "express"
import { TRCPCONTEXT } from "../context"

const ONE_MINUTE = 60 * 1000 // milliSeconds
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR
const ONE_MONTH = 30 * ONE_DAY
const ONE_YEAR = 12 * ONE_MONTH


const defaultCookieOptions: CookieOptions = {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: ONE_YEAR // One year
}

export function createCookieFactory(res: Response) {
    return function createCookie(
        name: string,
        value: string,
        options: CookieOptions = defaultCookieOptions
    ) {
        res.cookie(name, value, options)
    }
}

export function getCookieFactory(req: Request) {
    return function getCookie(name: string) {
        return req.cookies?.[name]
    }
}

export function clearCookieFactory(res: Response) {
    return function clearCookie(name: string) {
        return res.clearCookie(name)
    }
}

// Authentication Cookie
const VERIFICATION_COOKIE_NAME = "verification-token"  // to verify token sent on email 
const ACCESS_COOKIE_NAME = "access-token"  // to verify access token 
const REFRESH_COOKIE_NAME = "refresh-token"  // to verify refresh token

export function setAuthenticationCookie(ctx: TRCPCONTEXT, verificationToken: string, cookieType: string) {
    ctx.createCookie(cookieType, verificationToken)
}
export function getAuthenticationCookie(ctx: TRCPCONTEXT, cookieType: string) {
    return ctx.getCookie(cookieType)
}
export function clearAuthenticationCookie(ctx: TRCPCONTEXT, cookieType: string) {
    ctx.clearCookie(cookieType)
}

export function setUserId(ctx: TRCPCONTEXT, userId: string, cookieType: string) {
    ctx.createCookie(cookieType, userId)
}
export function getUserId(ctx: TRCPCONTEXT, cookieType: string) {
    return ctx.getCookie(cookieType)
}
export function clearUserId(ctx: TRCPCONTEXT, cookieType: string) {
    ctx.clearCookie(cookieType)
}