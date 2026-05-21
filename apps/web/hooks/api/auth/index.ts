import { trpc } from "~/trpc/client"

export const useSignUp = () => {
    const { mutateAsync: createUserWithEmailAndPasswordAsync,
        mutate: createUserWithEmailAndPassword,
        error,
        failureCount,
        failureReason,
        isError,
        isIdle,
        isSuccess,
        status
    } = trpc.auth.createUserWithEmailAndPassword.useMutation()

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