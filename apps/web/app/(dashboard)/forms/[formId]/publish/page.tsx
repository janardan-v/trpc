"use client";

import { useParams } from "next/navigation";

import { PasswordCard } from "~/components/forms/publish/password-card";
import { ShareLink } from "~/components/forms/publish/share-link";
import { VisibilitySelector } from "~/components/forms/publish/visibility-selector";

import { useFormMeta } from "~/hooks/custom/use-form-meta";

export default function PublishPage() {
  const params = useParams();

  const formId = params.formId as string;

  const {
    meta,

    updateForm,

    loading,
  } = useFormMeta(formId);

  if (loading || !meta) {
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

  const formMeta = meta;

  async function update(updates: {
    visibility?: "PUBLIC" | "PRIVATE" | "UNLISTED";

    password?: string;

    isPublished?: boolean;
  }) {
    await updateForm({
      formId: formMeta.formId,

      title: formMeta.title,

      description: formMeta.description,

      visibility: updates.visibility ?? formMeta.visibility,

      deadline: formMeta.deadline,

      isPublished: updates.isPublished ?? formMeta.isPublished,

      password: updates.password ?? formMeta.password,
    });
  }

  return (
    <div
      className="
        mx-auto

        max-w-4xl

        space-y-8

        p-8
      "
    >
      <div>
        <h1
          className="
            text-2xl
            font-bold
          "
        >
          Publish Form
        </h1>

        <p
          className="
            text-sm
            text-secondary
          "
        >
          Configure visibility and sharing
        </p>
      </div>

      <VisibilitySelector
        value={formMeta.visibility}
        onChange={(visibility) =>
          update({
            visibility,
          })
        }
      />

      {formMeta.visibility === "PRIVATE" && (
        <PasswordCard
          value={formMeta.password}
          onChange={(password) =>
            update({
              password,
            })
          }
        />
      )}

      <ShareLink formId={formId} />

      <button
        onClick={() =>
          update({
            isPublished: true,
          })
        }
        className="
          rounded-md

          border

          px-4

          py-2
        "
      >
        Publish
      </button>
    </div>
  );
}
