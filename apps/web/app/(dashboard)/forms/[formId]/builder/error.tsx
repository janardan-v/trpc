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

      <h2>

        Builder Error

      </h2>

      <p>

        {

          error.message

        }

      </p>

      <button

        onClick={
          reset
        }

      >

        Retry

      </button>

    </div>

  );

}