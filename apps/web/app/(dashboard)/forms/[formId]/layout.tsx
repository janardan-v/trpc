import { ReactNode } from "react";

import { DashboardSidebar } from "~/components/navigation/dashboard-sidebar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div
      className="
        flex
        min-h-screen

        bg-background
      "
    >
      <DashboardSidebar />

      <main
        className="
          flex-1
          overflow-hidden
        "
      >
        {children}
      </main>
    </div>
  );
}
