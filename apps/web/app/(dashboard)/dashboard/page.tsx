"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import { FormCard } from "~/components/dashboard/form-card";
import { FormsFilter } from "~/components/dashboard/forms-filter";
import { FormsSearch } from "~/components/dashboard/forms-search";

import { Button } from "~/components/ui/button";

import { useDashboardForms } from "~/hooks/custom/use-dashboard-forms";

export default function DashboardPage() {
  const { forms, loading, search, setSearch, filter, setFilter } = useDashboardForms();

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div
      className="
        p-8
        space-y-8
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Dashboard
          </h1>

          <p
            className="
              text-muted-foreground
            "
          >
            Manage your forms
          </p>
        </div>

        <Link href="/forms/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Form
          </Button>
        </Link>
      </div>

      <div
        className="
          flex
          gap-4
        "
      >
        <FormsSearch value={search} onChange={setSearch} />

        <FormsFilter value={filter} onChange={setFilter} />
      </div>

      {forms.length === 0 && (
        <div
          className="
            rounded-xl
            border
            p-10
            text-center
            space-y-4
          "
        >
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            No forms found
          </h2>

          <p
            className="
              text-muted-foreground
            "
          >
            Create your first form to get started.
          </p>

          <div
            className="
              flex
              justify-center
              gap-3
            "
          >
            <Link href="/forms/create">
              <Button>Create Form</Button>
            </Link>

            <Link href="/explore">
              <Button variant="outline">Explore Forms</Button>
            </Link>
          </div>
        </div>
      )}

      {forms.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {forms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      )}
    </div>
  );
}
