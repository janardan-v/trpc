"use client";

import { Trash2, Settings2 } from "lucide-react";
import { BuilderField } from "~/types/form";

interface Props {
  field?: BuilderField;
  updateField: (payload: any) => Promise<any>;
  deleteField: (payload: any) => Promise<any>;
}

export function FieldProperties({ field, updateField, deleteField }: Props) {
  const inputCls = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-3 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm";

  if (!field) {
    return (
      <div className="w-[300px] flex-shrink-0 border-l border-zinc-800 flex flex-col items-center justify-center gap-3 text-center p-8">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
          <Settings2 className="w-5 h-5 text-zinc-500" />
        </div>
        <p className="text-sm text-zinc-500">Select a field to configure it</p>
      </div>
    );
  }

  function save(updates: any) {
    updateField({
      fieldId: field!.id,
      label: updates.label ?? field!.label,
      type: field!.type,
      description: updates.description ?? field!.description,
      placeholder: updates.placeholder ?? field!.placeholder,
      isRequired: updates.isRequired ?? field!.isRequired,
      options: updates.options ?? field!.options,
      checkboxLabel: updates.checkboxLabel ?? field!.checkboxLabel,
      ratingMax: updates.ratingMax ?? field!.ratingMax,
      minValue: updates.minValue ?? field!.minValue,
      maxValue: updates.maxValue ?? field!.maxValue,
    });
  }

  return (
    <div className="w-[300px] flex-shrink-0 border-l border-zinc-800 flex flex-col overflow-hidden bg-[#0d0d14]">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Field Settings</h2>
          <p className="text-xs text-zinc-500 mt-0.5">{field.type} field</p>
        </div>
        <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-lg">{field.type}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Label */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Label</label>
          <input
            value={field.label}
            onChange={(e) => save({ label: e.target.value })}
            placeholder="Field label"
            className={inputCls}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description <span className="text-zinc-600">(optional)</span></label>
          <input
            value={field.description ?? ""}
            onChange={(e) => save({ description: e.target.value })}
            placeholder="Helper text..."
            className={inputCls}
          />
        </div>

        {/* Placeholder — not for CHECKBOX, RATING, DATE */}
        {["TEXT", "EMAIL", "NUMBER", "SELECT"].includes(field.type) && (
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Placeholder</label>
            <input
              value={field.placeholder ?? ""}
              onChange={(e) => save({ placeholder: e.target.value })}
              placeholder="Placeholder text..."
              className={inputCls}
            />
          </div>
        )}

        {/* NUMBER: min/max */}
        {field.type === "NUMBER" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Min</label>
              <input type="number" value={field.minValue ?? ""} onChange={(e) => save({ minValue: e.target.value === "" ? undefined : Number(e.target.value) })} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Max</label>
              <input type="number" value={field.maxValue ?? ""} onChange={(e) => save({ maxValue: e.target.value === "" ? undefined : Number(e.target.value) })} className={inputCls} />
            </div>
          </div>
        )}

        {/* RATING: ratingMax */}
        {field.type === "RATING" && (
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Max Rating (1–10)</label>
            <input
              type="number" min={1} max={10}
              value={field.ratingMax ?? 5}
              onChange={(e) => save({ ratingMax: Number(e.target.value) })}
              className={inputCls}
            />
          </div>
        )}

        {/* CHECKBOX: checkboxLabel */}
        {field.type === "CHECKBOX" && (
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Checkbox Text</label>
            <input
              value={field.checkboxLabel ?? ""}
              onChange={(e) => save({ checkboxLabel: e.target.value })}
              placeholder="I agree to the terms..."
              className={inputCls}
            />
          </div>
        )}

        {/* SELECT: options */}
        {field.type === "SELECT" && (
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">Options</label>
            <div className="space-y-2">
              {(field.options ?? []).map((opt, index) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <input
                    value={opt.label}
                    onChange={(e) => {
                      const updated = [...(field.options ?? [])];
                      updated[index] = {
                        id: opt.id,
                        label: e.target.value,
                        value: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      };
                      save({ options: updated });
                    }}
                    placeholder={`Option ${index + 1}`}
                    className={inputCls}
                  />
                  <button
                    onClick={() => {
                      const updated = (field.options ?? []).filter((_, i) => i !== index);
                      save({ options: updated });
                    }}
                    className="p-2 text-zinc-600 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => save({ options: [...(field.options ?? []), { id: crypto.randomUUID(), label: "New Option", value: "new-option" }] })}
                className="w-full text-xs text-indigo-400 hover:text-indigo-300 border border-dashed border-zinc-700 hover:border-indigo-500/40 rounded-xl py-2.5 transition-all"
              >
                + Add option
              </button>
            </div>
          </div>
        )}

        {/* Required toggle */}
        <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <span className="text-sm text-zinc-300">Required</span>
          <button
            onClick={() => save({ isRequired: !field.isRequired })}
            className={`relative w-10 h-5 rounded-full transition-colors ${field.isRequired ? "bg-indigo-600" : "bg-zinc-700"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${field.isRequired ? "left-5" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      {/* Delete */}
      <div className="p-5 border-t border-zinc-800">
        <button
          onClick={() => deleteField({ fieldId: field.id })}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium py-2.5 px-4 rounded-xl transition-all text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Delete field
        </button>
      </div>
    </div>
  );
}