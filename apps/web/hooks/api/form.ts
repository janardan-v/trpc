import { trpc } from "~/trpc/client";

export const useCreateForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createFormAsync,
    mutate: createForm,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      await utils.form.listFormByAdminId.invalidate();
      await utils.form.listFormsByUserId.invalidate();
      await utils.form.getPublicForms.invalidate();
    },
  });

  return {
    createFormAsync,
    createForm,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useListFormByAdminId = () => {
  const {
    data: forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  } = trpc.form.listFormByAdminId.useQuery();

  return {
    forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  };
};

export const useListFormByFormId = (formId: string) => {
  const {
    data: forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  } = trpc.form.listFormByFormId.useQuery({
    formId,
  });

  return {
    forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  };
};

export const useListFormByUserId = () => {
  const {
    data: forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  } = trpc.form.listFormsByUserId.useQuery();

  return {
    forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  };
};

export const useUpdateForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateFormAsync,
    mutate: updateForm,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.updateForm.useMutation({
    onSuccess: async () => {
      await utils.form.listFormByAdminId.invalidate();
      await utils.form.listFormsByUserId.invalidate();
      await utils.form.listFormByFormId.invalidate();
      await utils.form.getPublicForms.invalidate();
    },
  });

  return {
    updateFormAsync,
    updateForm,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useDeleteForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteFormAsync,
    mutate: deleteForm,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.deleteForm.useMutation({
    onSuccess: async () => {
      await utils.form.listFormByAdminId.invalidate();
      await utils.form.listFormsByUserId.invalidate();
      await utils.form.listFormByFormId.invalidate();
      await utils.form.getPublicForms.invalidate();
    },
  });

  return {
    deleteFormAsync,
    deleteForm,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useCreateFormFields = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createFormFieldsAsync,
    mutate: createFormFields,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.createFormFields.useMutation({
    onSuccess: async () => {
      await utils.form.getFormFields.invalidate();
    },
  });

  return {
    createFormFieldsAsync,
    createFormFields,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useUpdateFormFields = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateFormFieldsAsync,
    mutate: updateFormFields,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.updateFormFields.useMutation({
    onSuccess: async () => {
      await utils.form.getFormFields.invalidate();
    },
  });

  return {
    updateFormFieldsAsync,
    updateFormFields,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useGetFormFields = (formId:string) => {
  const {
    data: formFields,
    error,
    failureCount,
    failureReason,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    status,
  } = trpc.form.getFormFields.useQuery({formId});

  return {
    formFields,
    error,
    failureCount,
    failureReason,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    status,
  };
};

export const useDeleteFormFields = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteFormFieldsAsync,
    mutate: deleteFormFields,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.deleteFormFields.useMutation({
    onSuccess: async () => {
      await utils.form.getFormFields.invalidate();
    },
  });

  return {
    deleteFormFieldsAsync,
    deleteFormFields,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useGetSubmissionsByFormId = (formId: string) => {
  const {
    data: forms,
    error,
    failureCount,
    failureReason,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    status,
  } = trpc.form.getSubmissionsByFormId.useQuery({
    formId,
  });

  return {
    forms,
    error,
    failureCount,
    failureReason,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    status,
  };
};

export const useSubmitForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: submitFormAsync,
    mutate: submitForm,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.submitForm.useMutation({
    onSuccess: async () => {
      await utils.form.getSubmissionsByFormId.invalidate();
    },
  });

  return {
    submitFormAsync,
    submitForm,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

interface GetPublicFormInput {
  page: number;
  limit: number;
  search: string;
  sortBy: "NEWEST" | "OLDEST" | "DEADLINE" | undefined;
}
export const useGetPublicForms = ({ page, limit, search, sortBy }: GetPublicFormInput) => {
  const {
    data: forms,
    error,
    failureCount,
    failureReason,
    isError,
    isLoading,
    isFetched,
    isFetching,
    isSuccess,
    status,
  } = trpc.form.getPublicForms.useQuery({
    page,
    limit,
    search,
    sortBy,
  });

  return {
    forms,
    error,
    failureCount,
    failureReason,
    isError,
    isLoading,
    isFetched,
    isFetching,
    isSuccess,
    status,
  };
};
