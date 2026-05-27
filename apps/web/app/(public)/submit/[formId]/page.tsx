"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { FieldRenderer } from "~/components/forms/submit/field-renderer";
import { SubmissionSuccess } from "~/components/forms/submit/submission-success";
import { useFormSubmit } from "~/hooks/custom/use-form-submit";

export default function SubmitPage() {

  const params = useParams();

  const formId = params.formId as string;

  const {
    fields,
    loading,
    values,
    update,
    submit,
    canSubmit,
  } = useFormSubmit(formId);

  const [done, setDone] =
    useState(false);

  if (loading) {

    return (
      <div
        className="
          p-8
        "
      >
        Loading...
      </div>
    );

  }

  if (done) {

    return (
      <SubmissionSuccess />
    );

  }

  async function handleSubmit() {

    await submit();

    setDone(true);

  }

  return (

    <div
      className="
        mx-auto
        max-w-3xl
        space-y-8
        p-8
      "
    >

      {

        fields.map(
          (field) => (

            <FieldRenderer

              key={
                field.id
              }

              field={
                field
              }

              value={
                values[
                  field.id
                ]
              }

              onChange={
                (value) =>

                  update(
                    field.id,
                    value,
                  )
              }

            />

          ),
        )

      }

      <button

        disabled={
          !canSubmit
        }

        onClick={
          handleSubmit
        }

        className="
          rounded-md
          border
          px-4
          py-2
        "

      >

        Submit

      </button>

    </div>

  );

}