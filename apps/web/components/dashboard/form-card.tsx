"use client";

import Link from "next/link";

interface Props {

  form: {

    id: string;

    title: string;

    description?: string | null;

    isPublished?:
      boolean
      |
      null;

  };

}

export function FormCard({ form }: Props) {
  return (
    <Link
      href={`/forms/${form.id}/builder`}
      className="
        block
        rounded-lg
        border
        p-5
        transition

        hover:shadow-lg
      "
    >
      <h3
        className="
          text-lg
          font-semibold
        "
      >
        {form.title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          opacity-70
        "
      >
        {form.description ?? "No description"}
      </p>

      <div
        className="
          mt-4
          text-xs
        "
      >
        {form.isPublished ? "Published" : "Draft"}
      </div>
    </Link>
  );
}
