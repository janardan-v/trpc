"use client";

export function ShareLink({ formId }: { formId: string }) {
  const url = typeof window !== "undefined" ? `${window.location.origin}/submit/${formId}` : "";

  async function copy() {
    await navigator.clipboard.writeText(url);
  }

  return (
    <div
      className="
space-y-3
"
    >
      <label>Share Link</label>

      <div
        className="
flex
gap-2
"
      >
        <input
          readOnly
          value={url}
          className="
flex-1
rounded-md
border
p-2
"
        />

        <button onClick={copy}>Copy</button>
      </div>
    </div>
  );
}
