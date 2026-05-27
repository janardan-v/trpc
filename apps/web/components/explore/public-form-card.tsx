"use client";

import Link from "next/link";

interface Props {
  form: {
    id: string;

    title: string;

    description?: string | null;
  };
}

export function PublicFormCard({ form }: Props) {
  return (
    <Link
      href={`/submit/${form.id}`}
      className="
        block
        rounded-xl
        border
        p-5
        transition

        hover:shadow-md
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
    </Link>
  );
}
