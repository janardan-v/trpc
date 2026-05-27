"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import {
  useGetSubmissionsByFormId,
} from "~/hooks/api/form";

export default function AnalyticsPage() {

  const params =
    useParams();

  const formId =
    String(
      params.formId,
    );

  const {

    forms,

    isLoading,

  } =
    useGetSubmissionsByFormId(
      formId,
    );

  if (
    isLoading
  ) {

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

  const total =

    forms
      ?.submissions
      ?.length

    ??

    0;

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

        Analytics

      </h1>

      <div
        className="
          rounded-lg
          border
          p-6
        "
      >

        <p>

          Total submissions

        </p>

        <h2
          className="
            text-3xl
            font-bold
          "
        >

          {total}

        </h2>

      </div>

      <Link

        href={

          `/forms/${formId}/analytics-detail`

        }

        className="
inline-flex
rounded-lg
border
px-4
py-2
"

      >

        Open Detailed Analytics

      </Link>
    </div>

  );

}