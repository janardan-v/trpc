import { trpc } from "~/trpc/client";

export const useSignUp = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createUserWithEmailAndPasswordAsync,
    mutate: createUserWithEmailAndPassword,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.auth.createUserWithEmailAndPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    createUserWithEmailAndPasswordAsync,
    createUserWithEmailAndPassword,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useLogin = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: loginWithEmailAndPasswordAsync,
    mutate: loginWithEmailAndPassword,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.auth.loginWithEmailAndPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    loginWithEmailAndPasswordAsync,
    loginWithEmailAndPassword,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useUser = () => {
  const {
    data: user,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  } = trpc.auth.getLoggedInUserInfo.useQuery(undefined, {
    retry: false,
  });

  return {
    user,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  };
};

export const useUserUpdate = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: updateUserAsync,
    mutate: updateUser,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.auth.updateProfile.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    updateUserAsync,
    updateUser,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useLogout = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: logoutAsync,
    mutate: logout,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.auth.logoutUser.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    logoutAsync,
    logout,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};


export const useRefreshToken = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: refreshTokenAsync,
    mutate: refreshToken,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.auth.refreshTokenService.useMutation({
    onSuccess: async () => {
      await utils.auth.getLoggedInUserInfo.invalidate();
    },
  });

  return {
    refreshTokenAsync,
    refreshToken,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

