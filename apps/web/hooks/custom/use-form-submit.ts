"use client";

import { useMemo, useState } from "react";

import { useGetFormFields, useSubmitForm } from "~/hooks/api/form";

export function useFormSubmit(formId: string) {
  const {
    formFields,

    isLoading,
  } = useGetFormFields(formId);

  const { submitFormAsync } = useSubmitForm();

  const [values, setValues] = useState<Record<string, string>>({});

  function update(
    fieldId: string,

    value: string,
  ) {
    setValues((prev) => ({
      ...prev,

      [fieldId]: value,
    }));
  }

  const canSubmit = useMemo(() => {
    if (!formFields) {
      return false;
    }

    return formFields.every((field) => {
      if (!field.isRequired) {
        return true;
      }

      return Boolean(values[field.id]);
    });
  }, [formFields, values]);

  async function submit() {
    if (!formFields) {
      return;
    }

    await submitFormAsync({
      formId,

      values: formFields.map((field) => ({
        formFieldId: field.id,

        value: values[field.id] ?? "",
      })),
    });
  }

  return {
    fields: formFields ?? [],

    loading: isLoading,

    values,

    update,

    submit,

    canSubmit,
  };
}
