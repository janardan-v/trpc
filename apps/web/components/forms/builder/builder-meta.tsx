"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  meta: any;
  updateForm: (payload: any) => Promise<any>;
}

export function BuilderMeta({ meta, updateForm }: Props) {
  const [title, setTitle] = useState(meta.title ?? "");
  const [description, setDescription] = useState(meta.description ?? "");
  const [visibility, setVisibility] = useState(meta.visibility ?? "PUBLIC");
  const [deadline, setDeadline] = useState(
    meta.deadline ? new Date(meta.deadline).toISOString().slice(0, 16) : ""
  );
  const [password, setPassword] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync if meta changes externally
  useEffect(() => {
    setTitle(meta.title ?? "");
    setDescription(meta.description ?? "");
    setVisibility(meta.visibility ?? "PUBLIC");
  }, [meta.formId]);

  function scheduleUpdate(updates: any) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      await updateForm({
        formId: meta.formId,
        title: updates.title ?? title,
        description: updates.description ?? description,
        visibility: updates.visibility ?? visibility,
        deadline: updates.deadline ? new Date(updates.deadline) : (deadline ? new Date(deadline) : meta.deadline),
        isPublished: meta.isPublished,
        password: updates.password ?? (password || undefined),
      });
    }, 700);
  }

  const inputCls = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm";

  return (
    <div className="bg-[#0d0d14] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Form Settings</h2>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => { setTitle(e.target.value); scheduleUpdate({ title: e.target.value }); }}
          placeholder="Give your form a title..."
          className={`${inputCls} text-base font-medium`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Description <span className="text-zinc-500">(optional)</span></label>
        <textarea
          value={description}
          onChange={(e) => { setDescription(e.target.value); scheduleUpdate({ description: e.target.value }); }}
          placeholder="What is this form about?"
          rows={2}
          className={`${inputCls} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Visibility</label>
          <div className="relative">
            <select
              value={visibility}
              onChange={(e) => { setVisibility(e.target.value); scheduleUpdate({ visibility: e.target.value }); }}
              className={`${inputCls} appearance-none pr-8`}
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
              <option value="UNLISTED">Unlisted</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Deadline</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => { setDeadline(e.target.value); scheduleUpdate({ deadline: e.target.value }); }}
            className={inputCls}
          />
        </div>
      </div>

      {visibility === "PRIVATE" && (
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); scheduleUpdate({ password: e.target.value }); }}
            placeholder="Set a form password..."
            className={inputCls}
          />
        </div>
      )}
    </div>
  );
}