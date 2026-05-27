"use client";

import { FieldType } from "~/types/form";
import { Type, AtSign, Hash, Calendar, ChevronDown, CheckSquare, Star } from "lucide-react";

const FIELD_TYPES: { type: FieldType; label: string; description: string; icon: any }[] = [
  { type: "TEXT",     label: "Text",     description: "Short or long answer",  icon: Type },
  { type: "EMAIL",    label: "Email",    description: "Email address",          icon: AtSign },
  { type: "NUMBER",   label: "Number",   description: "Numeric input",          icon: Hash },
  { type: "DATE",     label: "Date",     description: "Date picker",            icon: Calendar },
  { type: "SELECT",   label: "Select",   description: "Dropdown choices",       icon: ChevronDown },
  { type: "CHECKBOX", label: "Checkbox", description: "Single checkbox",        icon: CheckSquare },
  { type: "RATING",   label: "Rating",   description: "Star or number scale",   icon: Star },
];

interface Props {
  formId: string;
  createField: (payload: any) => Promise<any>;
}

export function FieldSidebar({ formId, createField }: Props) {
  async function addField(type: FieldType) {
    await createField({
      formId,
      type,
      label: type === "CHECKBOX" ? "Accept Terms" : type === "SELECT" ? "Select Option" : `${type.charAt(0) + type.slice(1).toLowerCase()} Field`,
      description: "",
      placeholder: ["CHECKBOX", "RATING", "DATE"].includes(type) ? undefined : `Enter ${type.toLowerCase()}`,
      isRequired: false,
      checkboxLabel: type === "CHECKBOX" ? "I agree" : undefined,
      ratingMax: type === "RATING" ? 5 : undefined,
      options: type === "SELECT" ? [{ id: crypto.randomUUID(), label: "Option 1", value: "option_1" }] : undefined,
    });
  }

  return (
    <div className="w-[220px] flex-shrink-0 border-r border-zinc-800 flex flex-col bg-[#0d0d14]">
      <div className="px-4 py-4 border-b border-zinc-800">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Fields</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {FIELD_TYPES.map(({ type, label, description, icon: Icon }) => (
          <button
            key={type}
            onClick={() => addField(type)}
            className="w-full flex items-center gap-3 rounded-xl border border-transparent hover:border-zinc-700 hover:bg-zinc-800/50 p-3 text-left transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 flex items-center justify-center text-zinc-400 transition-all flex-shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-200">{label}</p>
              <p className="text-xs text-zinc-600 truncate">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}