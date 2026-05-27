"use client";

import { useMemo } from "react";

import { useListFormByFormId, useUpdateForm } from "~/hooks/api/form";

export function useFormMeta(formId: string) {
  const { forms, isLoading } = useListFormByFormId(formId);

  const { updateFormAsync } = useUpdateForm();

  const meta = useMemo(() => {
    if (!forms) {
      return null;
    }

    return {
      formId: forms.id,

      title: forms.title,

      description: forms.description ?? "",

      visibility: "PUBLIC" as "PUBLIC" | "PRIVATE" | "UNLISTED",

      isPublished: false,

      password: "",

      deadline: forms.deadline ? new Date(forms.deadline) : new Date(),
    };
  }, [forms]);

  return {
    meta,

    loading: isLoading,

    updateForm: updateFormAsync,
  };
}
