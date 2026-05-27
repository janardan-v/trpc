"use client";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

export function FormsSearch({
  value,

  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="
      Search forms
      "
      className="
        w-full
        rounded-md
        border
        p-3
      "
    />
  );
}
