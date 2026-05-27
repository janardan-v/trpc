"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form"

import { cn } from "~/lib/utils"
import { useLogin } from "~/hooks/api/auth"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

type LoginFormValues = {
  email: string
  password: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()

  const {
    loginWithEmailAndPasswordAsync,
  } = useLogin()

  const [serverError, setServerError] =
    useState("")

  const [showRegister, setShowRegister] =
    useState(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<LoginFormValues>({
      defaultValues: {
        email: "",
        password: "",
      },
    })

  const onSubmit:
    SubmitHandler<LoginFormValues> =
    async (values) => {

      setServerError("")
      setShowRegister(false)

      try {

        await loginWithEmailAndPasswordAsync({
          email: values.email,
          password: values.password,
        })

        router.replace("/dashboard")

      } catch (error: unknown) {

        const message =
          error instanceof Error ? error.message : String(error)

        if (
          message.includes(
            "USER_NOT_FOUND",
          )
        ) {

          setServerError(
            "User does not exist.",
          )

          setShowRegister(true)

          return

        }

        if (
          message.includes(
            "INVALID_PASSWORD",
          )
        ) {

          setServerError(
            "Incorrect password.",
          )

          return

        }

        setServerError(
          "Unable to login.",
        )

      }

    }

  return (

    <div
      className={cn(
        "w-full",
        className,
      )}
      {...props}
    >

      <Card>

        <CardHeader>

          <CardTitle>

            Login

          </CardTitle>

          <CardDescription>

            Enter your credentials
            to continue

          </CardDescription>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={
              handleSubmit(
                onSubmit,
              )
            }
            className="
            space-y-5
            "
          >

            <div
              className="
              space-y-2
              "
            >

              <label
                className="
                text-sm
                font-medium
                "
              >

                Email

              </label>

              <Input
                type="email"
                placeholder="m@example.com"
                disabled={
                  isSubmitting
                }
                {...register(
                  "email",
                  {
                    required:
                      "Email required",
                  },
                )}
              />

              {errors.email && (

                <p
                  className="
                  text-sm
                  text-red-500
                  "
                >

                  {
                    errors.email
                      .message
                  }

                </p>

              )}

            </div>

            <div
              className="
              space-y-2
              "
            >

              <div
                className="
                flex
                items-center
                justify-between
                "
              >

                <label
                  className="
                  text-sm
                  font-medium
                  "
                >

                  Password

                </label>

                <Link
                  href="#"
                  className="
                  text-sm
                  text-muted-foreground
                  hover:underline
                  "
                >

                  Forgot password?

                </Link>

              </div>

              <Input
                type="password"
                disabled={
                  isSubmitting
                }
                {...register(
                  "password",
                  {
                    required:
                    "Password required",
                  },
                )}
              />

              {errors.password && (

                <p
                  className="
                  text-sm
                  text-red-500
                  "
                >

                  {
                    errors.password
                      .message
                  }

                </p>

              )}

            </div>

            {serverError && (

              <div
                className="
                rounded-md
                border
                border-red-300
                bg-red-50
                px-3
                py-2
                text-sm
                text-red-600
                "
              >

                {serverError}

              </div>

            )}

            {showRegister && (

              <Button
                type="button"
                variant="outline"
                className="
                w-full
                "
                onClick={() =>
                  router.push(
                    "/signup",
                  )
                }
              >

                Create Account

              </Button>

            )}

            <Button
              type="submit"
              className="
              w-full
              "
              disabled={
                isSubmitting
              }
            >

              {
                isSubmitting
                ? "Logging in..."
                : "Login"
              }

            </Button>

            <p
              className="
              text-center
              text-sm
              "
            >

              Don't have an account?

              <Link
                href="/signup"
                className="
                ml-1
                font-medium
                hover:underline
                "
              >

                Sign up

              </Link>

            </p>

          </form>

        </CardContent>

      </Card>

    </div>

  )

}