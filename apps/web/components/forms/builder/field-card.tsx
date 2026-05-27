"use client";

import { GripVertical } from "lucide-react";

interface Option { id: string; label: string; value: string; }

interface Field {
  id: string;
  formId: string;
  label: string;
  type: "TEXT" | "EMAIL" | "NUMBER" | "DATE" | "SELECT" | "CHECKBOX" | "RATING";
  description: string | null;
  placeholder: string | null;
  isRequired: boolean;
  options?: Option[] | null;
  checkboxLabel?: string | null;
  ratingMax?: number | null;
  minValue?: number | null;
  maxValue?: number | null;
}

interface Props {
  field: Field;
  selected?: boolean;
  onSelect?: () => void;
  dragHandleProps?: any;
}

export function FieldCard({ field, selected, onSelect, dragHandleProps }: Props) {
  const inputCls = "w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500 text-sm cursor-not-allowed";

  return (
    <div
      onClick={onSelect}
      className={`border rounded-2xl bg-[#0d0d14] p-5 space-y-3 cursor-pointer transition-all group ${
        selected
          ? "border-indigo-500 ring-1 ring-indigo-500/40 shadow-lg shadow-indigo-500/10"
          : "border-zinc-800 hover:border-zinc-600"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
              selected ? "bg-indigo-500/20 text-indigo-300" : "bg-zinc-800 text-zinc-500"
            }`}>
              {field.type}
            </span>
            {field.isRequired && <span className="text-red-400 text-xs">Required</span>}
          </div>
          <h3 className="text-sm font-semibold text-white mt-1.5 truncate">{field.label}</h3>
          {field.description && <p className="text-xs text-zinc-500 mt-0.5 truncate">{field.description}</p>}
        </div>

        {/* Drag handle */}
        <div
          {...dragHandleProps}
          onClick={(e) => e.stopPropagation()}
          className="p-1 text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing flex-shrink-0 mt-0.5"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Field preview */}
      {(field.type === "TEXT" || field.type === "EMAIL") && (
        <input type={field.type === "EMAIL" ? "email" : "text"} placeholder={field.placeholder ?? "Enter answer..."} disabled className={inputCls} />
      )}
      {field.type === "NUMBER" && (
        <input type="number" placeholder={field.placeholder ?? "0"} disabled className={inputCls} />
      )}
      {field.type === "DATE" && (
        <input type="date" disabled className={inputCls} />
      )}
      {field.type === "SELECT" && (
        <select disabled className={inputCls}>
          <option>Select an option</option>
          {field.options?.map((opt) => <option key={opt.id} value={opt.value}>{opt.label}</option>)}
        </select>
      )}
      {field.type === "CHECKBOX" && (
        <label className="flex items-center gap-3 text-zinc-500 text-sm cursor-not-allowed">
          <input type="checkbox" disabled className="accent-indigo-500" />
          {field.checkboxLabel ?? "Checkbox option"}
        </label>
      )}
      {field.type === "RATING" && (
        <div className="flex gap-2">
          {Array.from({ length: field.ratingMax ?? 5 }).map((_, i) => (
            <div key={i} className="w-9 h-9 rounded-lg border border-zinc-800 text-zinc-600 flex items-center justify-center text-sm">
              {i + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}