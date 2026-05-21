import { trpc } from "~/trpc/client"

export const useSignUp = () => {

    const utils = trpc.useUtils()


    const { mutateAsync: createUserWithEmailAndPasswordAsync,
        mutate: createUserWithEmailAndPassword,
        error,
        failureCount,
        failureReason,
        isError,
        isIdle,
        isSuccess,
        status
    } = trpc.auth.createUserWithEmailAndPassword.useMutation({
        onSuccess: async () => {
            await utils.auth.getLoggedInUserInfo.invalidate()

        }
    })

    return {
        createUserWithEmailAndPasswordAsync,
        createUserWithEmailAndPassword,
        error,
        failureCount,
        failureReason,
        isError,
        isIdle,
        isSuccess,
        status
    }
}
export const useLogin = () => {
    const utils = trpc.useUtils()
    const { mutateAsync: loginWithEmailAndPasswordAsync,
        mutate: loginWithEmailAndPassword,
        error,
        failureCount,
        failureReason,
        isError,
        isIdle,
        isSuccess,
        status
    } = trpc.auth.loginWithEmailAndPassword.useMutation({
        onSuccess: async () => {
            await utils.auth.getLoggedInUserInfo.invalidate()
        }
    })

    return {
        loginWithEmailAndPasswordAsync,
        loginWithEmailAndPassword,
        error,
        failureCount,
        failureReason,
        isError,
        isIdle,
        isSuccess,
        status
    }
}

export const useUser = () => {
    const { data: user,
        error,
        isFetched,
        isFetching,
        isLoading,
        isError,
        isSuccess,
        status
    } = trpc.auth.getLoggedInUserInfo.useQuery()

    return {
        user,
        error,
        isFetched,
        isFetching,
        isLoading,
        isError,
        isSuccess,
        status
    }
}