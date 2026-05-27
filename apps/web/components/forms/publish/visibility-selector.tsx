"use client";

interface Props {
  value: "PUBLIC" | "PRIVATE" | "UNLISTED";

  onChange: (value: "PUBLIC" | "PRIVATE" | "UNLISTED") => void;
}

export function VisibilitySelector({
  value,

  onChange,
}: Props) {
  return (
    <div
      className="
        space-y-3
      "
    >
      <label>Visibility</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "PUBLIC" | "PRIVATE" | "UNLISTED")}
        className="
          w-full
          rounded-md
          border
          p-2
        "
      >
        <option value="PUBLIC">PUBLIC</option>

        <option value="PRIVATE">PRIVATE</option>

        <option value="UNLISTED">UNLISTED</option>
      </select>
    </div>
  );
}
