"use client";

import { use, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { BuilderHeader } from "~/components/forms/builder/builder-header";
import { BuilderMeta } from "~/components/forms/builder/builder-meta";
import { FieldCanvas } from "~/components/forms/builder/field-canvas";
import { FieldProperties } from "~/components/forms/builder/field-properties";
import { FieldSidebar } from "~/components/forms/builder/field-sidebar";
import { BuilderSaveIndicator } from "~/components/forms/builder/builder-save-indicator";

import {
  useCreateFormFields,
  useDeleteFormFields,
  useGetFormFields,
  useUpdateFormFields,
  useListFormByFormId,
  useUpdateForm,
} from "~/hooks/api/form";

type Props = {
  params: Promise<{ formId: string }>;
};

export default function BuilderPage({ params }: Props) {
  const { formId } = use(params);
  const router = useRouter();

  const { formFields = [], isLoading } = useGetFormFields(formId) as any;
  const { forms: formMeta } = useListFormByFormId(formId) as any;

  const { createFormFieldsAsync } = useCreateFormFields() as any;
  const { updateFormFieldsAsync } = useUpdateFormFields() as any;
  const { deleteFormFieldsAsync } = useDeleteFormFields() as any;
  const { updateFormAsync } = useUpdateForm() as any;

  const [selectedFieldId, setSelectedFieldId] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");

  const selectedField = formFields.find((f: any) => f.id === selectedFieldId);

  const withSaving = useCallback(async (fn: () => Promise<any>) => {
    setSaving(true);
    try { await fn(); } finally { setSaving(false); }
  }, []);

  async function createField(payload: any) {
    await withSaving(() => createFormFieldsAsync(payload));
  }

  async function updateField(payload: any) {
    await withSaving(() => updateFormFieldsAsync(payload));
  }

  async function deleteField(payload: any) {
    await withSaving(() => deleteFormFieldsAsync(payload));
    // deselect if deleted field was selected
    if (selectedFieldId === payload.fieldId) setSelectedFieldId(undefined);
  }

  async function updateForm(payload: any) {
    await withSaving(() => updateFormAsync(payload));
  }

  // Publish validation
  function getPublishErrors(): string[] {
    const errors: string[] = [];
    if (!formMeta?.title) errors.push("Form title is required");
    if (!formFields.length) errors.push("Add at least one field");
    if (!formMeta?.deadline) errors.push("Deadline is required");
    const selectWithNoOptions = formFields.find(
      (f: any) => f.type === "SELECT" && (!f.options || f.options.length === 0)
    );
    if (selectWithNoOptions) errors.push("All SELECT fields must have options");
    return errors;
  }

  async function handlePublish() {
  const errors = getPublishErrors();

  const firstError = errors.at(0);

  if (firstError) {
    setPublishError(firstError);
    return;
  }

  setPublishError("");
  setPublishing(true);

  try {
    await updateFormAsync({
      formId,
      isPublished: true,
      title: formMeta.title ?? "",
      description: formMeta.description,
      visibility: formMeta.visibility ?? "PUBLIC",
      deadline: formMeta.deadline
        ? new Date(formMeta.deadline)
        : new Date(),
    });
  } finally {
    setPublishing(false);
  }
}

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0a0a0f] text-white flex items-center justify-center font-['DM_Sans',sans-serif]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-zinc-400 text-sm">Loading builder...</span>
        </div>
      </div>
    );
  }

  const canPublish = getPublishErrors().length === 0;

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f] text-white overflow-hidden font-['DM_Sans',sans-serif]">
      {/* Top Bar */}
      <BuilderHeader
        formMeta={formMeta}
        fields={formFields}
        saving={saving}
        publishing={publishing}
        canPublish={canPublish}
        publishError={publishError}
        onPublish={handlePublish}
        onPreview={() => router.push(`/dashboard/forms/${formId}/preview`)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Field Library */}
        <FieldSidebar formId={formId} createField={createField} />

        {/* Center: Meta + Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-[#0a0a0f] p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Form meta inline at top of canvas */}
              {formMeta && (
                <BuilderMeta meta={{ ...formMeta, formId }} updateForm={updateForm} />
              )}

              {/* Field Canvas */}
              <FieldCanvas
                fields={formFields}
                selected={selectedFieldId}
                setSelected={setSelectedFieldId}
                updateField={updateField}
              />

              {/* Empty state */}
              {formFields.length === 0 && (
                <div className="border border-dashed border-zinc-700 rounded-2xl p-16 text-center">
                  <p className="text-zinc-500 text-sm mb-1">Your form is empty</p>
                  <p className="text-zinc-600 text-xs">Click a field type in the left sidebar to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Field Properties */}
        <FieldProperties
          field={selectedField}
          updateField={updateField}
          deleteField={deleteField}
        />
      </div>
    </div>
  );
}