"use client";

import { BuilderField } from "~/types/form";

import { FieldCard } from "./field-card";

interface Props {
  formId: string;

  fields: BuilderField[];
}

export function BuilderCanvas({
  fields,
}: Props) {
  return (
    <div
      className="
flex-1
overflow-y-auto
bg-black
p-8
"
    >
      <div
        className="
max-w-3xl
mx-auto
space-y-4
"
      >
        {fields.length === 0 ? (
          <div
            className="
border
border-dashed
border-zinc-700
rounded-xl
p-12
text-center
text-zinc-500
"
          >
            Add a field from
            left sidebar
          </div>
        ) : (
          fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
            />
          ))
        )}
      </div>
    </div>
  );
}