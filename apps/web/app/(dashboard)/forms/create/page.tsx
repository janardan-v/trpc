"use client";

import { useRouter } from "next/navigation";

import { useCreateForm } from "~/hooks/api/form";

export default function CreateFormPage() {

  const router =
    useRouter();

  const {

    createFormAsync,

  } =
    useCreateForm();

  async function create() {

    try {

      const result =
        await createFormAsync({

          title:
            "Untitled Form",

          description:
            "",

          deadline:

            new Date(

              Date.now()

              +

              1000
              *
              60
              *
              60
              *
              24
              *
              30,

            ),

        });

      router.push(

        `/forms/${result.formId}/builder`,

      );

    } catch (

      error

    ) {

      console.error(

        error,

      );

    }

  }

  return (

    <div
      className="
        flex
        h-[70vh]
        items-center
        justify-center
      "
    >

      <button

        onClick={
          create
        }

        className="
          rounded-lg
          border
          px-6
          py-3
          transition
          hover:opacity-80
        "

      >

        Create Form

      </button>

    </div>

  );

}