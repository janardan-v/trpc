"use client";

interface Props {
  error: Error;

  reset: () => void;
}

export default function Error({
  error,

  reset,
}: Props) {
  return (
    <div>
      <p>{error.message}</p>

      <button onClick={reset}>Retry</button>
    </div>
  );
}
