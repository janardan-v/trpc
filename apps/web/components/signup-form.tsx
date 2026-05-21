"use client"
// import {} from "trpc"
import { useForm, type SubmitHandler } from "react-hook-form"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { trpc } from "~/trpc/client"
import { useSignUp } from "~/hooks/api/auth"

type SignupFormValues = {
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {createUserWithEmailAndPasswordAsync, createUserWithEmailAndPassword, isError} = useSignUp()

 const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<SignupFormValues>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const formValues = watch()

  const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
    const result = await createUserWithEmailAndPasswordAsync({ fullname: values.fullname, email: values.email, password: values.password })
    console.log("Form submitted with values:", values)
    console.log("Name:", values.fullname)
    console.log("Email:", values.email)
    console.log("Password:", values.password)
    console.log("Confirm Password:", values.confirmPassword)
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  {...register("fullname")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      {...register("password")}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      {...register("confirmPassword")}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
