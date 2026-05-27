"use client";

import { useMemo, useState } from "react";

import { useListFormByAdminId } from "~/hooks/api/form";

type FilterType =
  | "ALL"
  | "PUBLISHED"
  | "DRAFT";

export function useDashboardForms() {

  const {
    forms,
    isLoading,
  } =
    useListFormByAdminId();

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    filter,
    setFilter,
  ] =
    useState<FilterType>(
      "ALL",
    );

  const filtered =
    useMemo(() => {

      const data =
        forms?.forms ??
        [];

      return data.filter(
        (form) => {

          const matchesSearch =

            form.title
              .toLowerCase()
              .includes(
                search
                  .toLowerCase(),
              );

          const matchesFilter =

            filter ===
            "ALL"

            ||

            (
              filter ===
              "PUBLISHED"

              &&

              form.isPublished
            )

            ||

            (
              filter ===
              "DRAFT"

              &&

              !form.isPublished
            );

          return (

            matchesSearch

            &&

            matchesFilter

          );

        },
      );

    }, [

      forms,

      search,

      filter,

    ]);

  return {

    forms:
      filtered,

    loading:
      isLoading,

    search,

    setSearch,

    filter,

    setFilter,

  };

}