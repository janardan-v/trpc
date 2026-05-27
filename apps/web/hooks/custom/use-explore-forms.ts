"use client";

import { useState } from "react";

import { useGetPublicForms } from "~/hooks/api/form";

type SortType =
  "NEWEST"
  |
  "OLDEST";

export function useExploreForms() {

  const [

    search,

    setSearch,

  ] =
    useState("");

  const [

    sortBy,

    setSortBy,

  ] =
    useState<SortType>(
      "NEWEST",
    );

  const {

    forms,

    isLoading,

  } =
    useGetPublicForms({

      page: 1,

      limit: 24,

      search,

      sortBy,

    });

  return {

    forms:

      forms?.forms

      ??

      [],

    loading:

      isLoading,

    search,

    setSearch,

    sortBy,

    setSortBy,

  };

}