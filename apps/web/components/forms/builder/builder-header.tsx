"use client";

import { Loader2, Eye, Rocket, AlertCircle, CheckCircle2 } from "lucide-react";
import { BuilderSaveIndicator } from "./builder-save-indicator";

interface Props {
  formMeta: any;
  fields: any[];
  saving: boolean;
  publishing: boolean;
  canPublish: boolean;
  publishError: string;
  onPublish: () => void;
  onPreview: () => void;
}

export function BuilderHeader({
  formMeta,
  saving,
  publishing,
  canPublish,
  publishError,
  onPublish,
  onPreview,
}: Props) {
  return (
    <div className="border-b border-zinc-800/80 px-6 py-3 flex items-center justify-between bg-[#0d0d14] flex-shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-white truncate max-w-[260px]">
          {formMeta?.title || <span className="text-zinc-500 italic">Untitled form</span>}
        </span>
        {formMeta?.isPublished && (
          <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> Published
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <BuilderSaveIndicator saving={saving} />

        {publishError && (
          <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {publishError}
          </div>
        )}

        <button
          onClick={onPreview}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-zinc-800 transition-all"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>

        <button
          onClick={onPublish}
          disabled={publishing}
          title={!canPublish ? "Complete required fields before publishing" : undefined}
          className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-lg ${
            canPublish
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {publishing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Rocket className="w-4 h-4" />
          )}
          {publishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
}