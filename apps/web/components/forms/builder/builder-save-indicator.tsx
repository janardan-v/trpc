"use client";

import { Loader2, Check } from "lucide-react";

interface Props {
  saving: boolean;
}

export function BuilderSaveIndicator({ saving }: Props) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
      {saving ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Check className="w-3 h-3 text-emerald-500" />
          <span>Saved</span>
        </>
      )}
    </div>
  );
}