"use client";

import { useParams } from "next/navigation";

import { useGetFormFields, useGetSubmissionsByFormId } from "~/hooks/api/form";

export default function AnalyticsDetailPage() {
  const params = useParams();

  const formId = String(params.formId);

  const {
    formFields,

    isLoading: fieldsLoading,
  } = useGetFormFields(formId);

  const {
    forms,

    isLoading: submissionsLoading,
  } = useGetSubmissionsByFormId(formId);

  if (fieldsLoading || submissionsLoading) {
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

  const fields = formFields ?? [];

  const submissions = forms?.submissions ?? [];

  return (
    <div
      className="
        p-8
        space-y-6
      "
    >
      <h1
        className="
          text-2xl
          font-bold
        "
      >
        Submission Analytics
      </h1>

      <div
        className="
          overflow-x-auto
          rounded-lg
          border
        "
      >
        <table
          className="
            min-w-full
          "
        >
          <thead>
            <tr
              className="
                border-b
              "
            >
              <th
                className="
                  p-4
                "
              >
                #
              </th>

              {fields.map((field) => (
                <th
                  key={field.id}
                  className="
                        p-4
                        text-left
                      "
                >
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {submissions.map(
              (
                submission,

                index,
              ) => {
                const values = submission.values ?? [];

                return (
                  <tr
                    key={submission.id}
                    className="
                        border-b
                      "
                  >
                    <td
                      className="
                          p-4
                        "
                    >
                      {index + 1}
                    </td>

                    {fields.map((field) => {
                      const answer = values.find((v) => v.formFieldId === field.id);

                      return (
                        <td
                          key={field.id}
                          className="
                                  p-4
                                "
                        >
                          {answer?.value ?? "-"}
                        </td>
                      );
                    })}
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
