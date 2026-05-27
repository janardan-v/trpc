"use client";

import {
    useExploreForms,
} from "~/hooks/custom/use-explore-forms";

import {
    PublicFormCard,
} from "~/components/explore/public-form-card";

export default function ExplorePage() {

    const {

        forms,

        loading,

        search,

        setSearch,

        sortBy,

        setSortBy,

    } =
        useExploreForms();

    if (
        loading
    ) {

        return (

            <div
                className="
          p-8
        "
            >

                Loading...

            </div>

        );

    }

    return (

        <div
            className="
        mx-auto
        max-w-7xl
        space-y-6
        p-8
      "
        >

            <div
                className="
          flex
          items-center
          justify-between
        "
            >

                <h1
                    className="
            text-3xl
            font-bold
          "
                >

                    Explore Forms

                </h1>

                <select

                    value={
                        sortBy
                    }

                    onChange={
                        (e) =>

                            setSortBy(

                                e.target.value as "NEWEST" | "OLDEST",

                            )
                    }

                    className="
            rounded-lg
            border
            px-4
            py-2
          "
                >

                    <option
                        value="
            NEWEST
            "
                    >

                        Newest First

                    </option>

                    <option
                        value="
            OLDEST
            "
                    >

                        Oldest First

                    </option>

                </select>

            </div>

            <input

                value={
                    search
                }

                onChange={
                    (e) =>

                        setSearch(

                            e.target.value,

                        )
                }

                placeholder="
          Search forms...
        "

                className="
          w-full
          rounded-lg
          border
          p-3
        "

            />

            {

                forms.length
                ===
                0

                &&

                (

                    <div
                        className="
              rounded-xl
              border
              p-10
              text-center
              opacity-70
            "
                    >

                        No forms found

                    </div>

                )

            }

            <div
                className="
          grid
          gap-6

          md:grid-cols-2

          xl:grid-cols-3
        "
            >

                {

                    forms.map(

                        (
                            form: any,
                        ) => (

                            <PublicFormCard

                                key={
                                    form.id
                                }

                                form={
                                    form
                                }

                            />

                        ),

                    )

                }

            </div>

        </div>

    );

}