"use client";

import { BuilderField } from "~/types/form";

interface Props {

  field: BuilderField;

  value: any;

  onChange: (
    value: any,
  ) => void;

}

export function FieldRenderer({

  field,
  value,
  onChange,

}: Props) {

  switch (field.type) {

    case "TEXT":

    case "EMAIL":

    case "NUMBER":

      return (

        <div
          className="
            space-y-2
          "
        >

          <label>

            {
              field.label
            }

          </label>

          <input

            type={
              field.type
                .toLowerCase()
            }

            value={
              value ?? ""
            }

            placeholder={
              field.placeholder ??
              undefined
            }

            onChange={
              (e) =>

                onChange(
                  e.target.value,
                )
            }

            className="
              w-full
              rounded-md
              border
              p-3
            "
          />

        </div>

      );

    default:

      return null;

  }

}