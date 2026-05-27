import type { ReactNode } from "react"

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {

  return (

    <main
      className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-background
      px-6
      py-8
      "
    >

      {children}

    </main>

  )

}