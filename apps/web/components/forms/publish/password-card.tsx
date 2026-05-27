"use client";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

export function PasswordCard({
  value,

  onChange,
}: Props) {
  return (
    <div
      className="
space-y-2
"
    >
      <label>Password</label>

      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
w-full
rounded-md
border
p-2
"
      />
    </div>
  );
}
