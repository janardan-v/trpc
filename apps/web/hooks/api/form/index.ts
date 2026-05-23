import { trpc } from "~/trpc/client";

export const useCreateForm = () => {
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
  } = trpc.form.createForm.useMutation();

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
  } = trpc.form.createForm.useMutation();

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
  } = trpc.form.deleteForm.useMutation();

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
  } = trpc.form.deleteForm.useMutation();

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
  } = trpc.form.updateFormFields.useMutation();

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

export const useGetFormFields = () => {
  const {
    mutateAsync: getFormFieldsAsync,
    mutate: getFormFields,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.getFormFields.useMutation();

  return {
    getFormFieldsAsync,
    getFormFields,
    error,
    failureCount,
    failureReason,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useDeleteFormFields = () => {
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
  } = trpc.form.deleteFormFields.useMutation();

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
  } = trpc.form.submitForm.useMutation({});

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
    sortBy
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
