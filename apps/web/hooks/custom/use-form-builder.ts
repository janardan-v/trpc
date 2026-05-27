"use client";

import { useMemo } from "react";

import {
  useCreateFormFields,
  useDeleteFormFields,
  useGetFormFields,
  useUpdateFormFields,
} from "~/hooks/api/form";

export function useFormBuilder(formId: string) {
  const { formFields, isLoading } = useGetFormFields(formId);

  const { createFormFieldsAsync, status: createStatus } = useCreateFormFields();

  const { updateFormFieldsAsync, status: updateStatus } = useUpdateFormFields();

  const { deleteFormFieldsAsync, status: deleteStatus } = useDeleteFormFields();

  const fields = useMemo(() => {
    if (!formFields) {
      return [];
    }

    return [...formFields].sort((a, b) => Number(a.index) - Number(b.index));
  }, [formFields]);

  const saving =
    createStatus === "pending" || updateStatus === "pending" || deleteStatus === "pending";

  return {
    fields,

    loading: isLoading,

    saving,

    createField: createFormFieldsAsync,

    updateField: updateFormFieldsAsync,

    deleteField: deleteFormFieldsAsync,
  };
}
