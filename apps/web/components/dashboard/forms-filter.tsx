"use client";

interface Props {
  value: "ALL" | "PUBLISHED" | "DRAFT";

  onChange: (value: any) => void;
}

export function FormsFilter({
  value,

  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
rounded-md
border
p-2
"
    >
      <option value="ALL">ALL</option>

      <option value="PUBLISHED">PUBLISHED</option>

      <option value="DRAFT">DRAFT</option>
    </select>
  );
}
