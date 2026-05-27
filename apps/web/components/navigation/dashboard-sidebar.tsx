"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

const items = [
  {
    href: "/dashboard",

    label: "Dashboard",
  },

  {
    href: "/forms/create",

    label: "Create",
  },

  {
    href: "/explore",

    label: "Explore",
  },

  {
    href: "/profile",

    label: "Profile",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        w-72

        border-r

        border-primary

        surface-primary

        p-6
      "
    >
      <h2
        className="
          mb-8
          text-xl
          font-bold
        "
      >
        Parcha
      </h2>

      <div
        className="
          space-y-2
        "
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
                  block

                  rounded-md

                  p-3

                  ${pathname === item.href ? "surface-secondary" : ""}
                  `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
