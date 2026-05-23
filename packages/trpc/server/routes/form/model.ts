import { z } from "zod";

// #region FORM
export const createFormInputModel = z.object({
  title: z.string().min(6).max(55).describe("Title of the form"),
  description: z.string().max(300).describe("Description of the form").optional(),
  visibility: z
    .enum(["PUBLIC", "PRIVATE", "UNLISTED"])
    .describe("Visibility of the form")
    .default("PUBLIC"),
  isPublished: z.boolean().describe("Is the form published").default(false),
  isPasswordProtected: z.boolean().describe("Is the form password protected").default(false),
  password: z.string().describe("Password of the form").optional(),
  deadline: z.date().describe("Deadline of the form"),
  //   adminId: z.uuid().describe("Admin of the form"),  to be send from middleWare
});

export const createFormOutputModel = z.object({
  formId: z.uuid().describe("Id of the created form"),
  adminId: z.uuid().describe("Admin of the form"),
});

export const listFormByAdminIdInputModel = z.undefined();
export const listFormByAdminIdOutputModel = z.object({
  forms: z.array(
    z.object({
      id: z.uuid().describe("Id of the form"),
      title: z.string().describe("Title of the form"),
      description: z.string().nullable().describe("Description of the form"),
      visibility: z
        .enum(["PUBLIC", "PRIVATE", "UNLISTED"])
        .nullable()
        .describe("Visibility of the form"),
      isPublished: z.boolean().nullable().describe("Is the form published"),
      deadline: z.date().describe("Deadline of the form"),
      createdAt: z.date().nullable().describe("Time of creation of the form"),
      updatedAt: z.date().nullable().describe("Time of updation of the form"),
    }),
  ),
});

export const listFormsByFormIdInputModel = z.object({
  formId: z.uuid().describe("Id of the form"),
});
export const listFormsByFormIdOutputModel = z.object({
  id: z.uuid().describe("Id of the form"),
  title: z.string().describe("Title of the form"),
  description: z.string().nullable().describe("Description of the form"),

  deadline: z.date().describe("Deadline of the form"),
  createdAt: z.date().nullable().describe("Time of creation of the form"),
  updatedAt: z.date().nullable().describe("Time of updation of the form"),

  field: z
    .array(
      z.object({
        fieldId: z.uuid().describe("Id of the field"),
        label: z.string().describe("Label of the field"),
        labelKey: z.string().describe("Label key of the field"),
        type: z
          .enum(["TEXT", "EMAIL", "NUMBER", "DATE", "SELECT", "CHECKBOX", "RATING"])
          .describe("Type of the field"),
        description: z.string().nullable().describe("Description of the field"),
        placeholder: z.string().nullable().describe("Placeholder of the field"),
        index: z.string().describe("Index of the field"),
        isRequired: z.boolean().describe("Is the field required"),
      }),
    )
    .describe("Fields of the form"),
});

export const listFormsByUserIdInputModel = z.undefined();
export const listFormsByUserIdOutputModel = z.array(
  z.object({
    submissionId: z.uuid().describe("Id of the submission"),

    submittedAt: z.date().describe("Time of submission").nullable(),
    form: z.object({
      formId: z.uuid().describe("Id of the form"),
      title: z.string().describe("Title of the form"),
      description: z.string().describe("Description of the form").nullable(),
      deadline: z.date().describe("Deadline of the form"),
    }),
  }),
);

export const updateFormInputModel = z.object({
  //   userId: z.uuid().describe("Id of the user trying to update the field"), // from ctx
  formId: z.uuid().describe("Id of the form to be updated"),
  title: z.string().min(6).max(55).describe("Title of the form"),
  description: z.string().max(300).describe("Description of the form").optional(),
  visibility: z
    .enum(["PUBLIC", "PRIVATE", "UNLISTED"])
    .describe("Visibility of the form")
    .default("PUBLIC"),
  isPublished: z.boolean().describe("Is the form published").default(false),
  password: z.string().describe("Password of the form").optional(),
  deadline: z.date().describe("Deadline of the form"),
});
export const updateFormOutputModel = z.object({
  formId: z.string().describe("Id of the updated form"),
  adminId: z.string().describe("Admin of the form"),
});

export const deleteFormInputModel = z.object({
  formId: z.string().describe("Id of the form to be deleted"),
});
export const deleteFormOutputModel = z.object({
  formId: z.string().describe("Id of the form to be deleted"),
  success: z.boolean().describe("Success of the operation"),
});

export const getPublicFormsInputModel = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(20),
  search: z.string().optional(),
  sortBy: z.enum(["NEWEST", "OLDEST", "DEADLINE"]).default("NEWEST"),
});
export const getPublicFormsOutputModel = z.object({
  forms: z.array(
    z.object({
      id: z.uuid().describe("Id of the form"),
      title: z.string().describe("Title of the form"),
      description: z.string().describe("Description of the form").nullable(),
      deadline: z.date().describe("Deadline of the form"),
      createdAt: z.date().describe("Time of creation of the form"),
    }),
  ),

  pagination: z.object({
    page: z.number().describe("Current page number"),
    limit: z.number().describe("Limit of the page"),
    hasMore: z.boolean().describe("Has more pages"),
  }),
});

// #endregion

// #region FORM FIELDS
export const createFormFieldsInputModel = z.object({
  formId: z.uuid().describe("Id of the parent form"),
  label: z.string().min(4).max(100).describe("Label of the field"),

  type: z.enum(["TEXT", "EMAIL", "NUMBER", "DATE", "SELECT", "CHECKBOX", "RATING"]),

  description: z.string().max(300).describe("Description of the field").optional(),
  placeholder: z.string().max(100).describe("Placeholder of the field").optional(),

  isRequired: z.boolean().describe("Is the field required").default(false),
});
export const createFormFieldsOutputModel = z.object({
  fieldId: z.uuid().describe("Id of the created field"),
  formId: z.uuid().describe("Id of the form to which the field belongs"),
});

export const updateFormFieldsInputModel = z.object({
  fieldId: z.uuid().describe("Field id to update"),
  label: z.string().min(4).max(100).describe("Label of the field"),

  type: z.enum(["TEXT", "EMAIL", "NUMBER", "DATE", "SELECT", "CHECKBOX", "RATING"]),

  description: z.string().max(300).describe("Description of the field").optional(),
  placeholder: z.string().max(100).describe("Placeholder of the field").optional(),

  isRequired: z.boolean().describe("Is the field required").default(false),
});
export const updateFormFieldsOutputModel = z.object({
  fieldId: z.uuid().describe("Id of the created field"),
  formId: z.uuid().describe("Id of the form to which the field belongs"),
  success: true,
});

export const getFormFieldsInputModel = z.object({
  formId: z.uuid().describe("Id of the form"),
});

export const getFormFieldsOutputModel = z.array(
  z.object({
    id: z.string().describe("Id of the field"),
    formId: z.string().describe("Id of the parent form"),
    label: z.string().describe("Label of the field"),
    labelKey: z.string().describe("labelkey of the field"),
    type: z.enum(["TEXT", "EMAIL", "NUMBER", "DATE", "SELECT", "CHECKBOX", "RATING"]),
    description: z.string().describe("Description of the field").nullable(),
    placeholder: z.string().describe("Pxlaceholder of the field").nullable(),
    isRequired: z.boolean().describe("Is the field required").default(false),
    index: z.string().describe("Partial Index of the field to sort"),
    createdAt: z.date().describe("Time of creation of the field").nullable(),
    updatedAt: z.date().describe("Time of updation of the field").nullable(),
  }),
);

export const deleteFormFieldsInputModel = z.object({
  fieldId: z.uuid().describe("Field id to update"),
});
export const deleteFormFieldsOutputModel = z.object({
  fieldId: z.uuid().describe("Id of the created field"),
  formId: z.uuid().describe("Id of the form to which the field belongs"),
  success: true,
});

// #endregion

// #region SUBMISSIONS

export const submitFormInputModel = z.object({
  formId: z.uuid().describe("Id of the form to be submitted"),
  userId: z.uuid().describe("Id of the user submitting the form").nullable().optional(),
  browserFingerprint: z.string().describe("Fingerprint of the browser").optional(),
  values: z.array(
    z.object({
      formFieldId: z.uuid().describe("Id of the field"),
      value: z.string().describe("Value of the field"),
    }),
  ),
});
export const submitFormOutputModel = z.object({
  id: z.uuid().describe("Id of the submission"),
  formId: z.uuid().describe("Id of the form"),
  success: z.boolean().describe("Success of the operation"),
});

export const getSubmissionsByFormIdInputModel = z.object({
  formId: z.uuid().describe("Id of the form to be submitted"),
});
export const getSubmissionsByFormIdOutputModel = z.object({
  submissions: z.array(
    z.object({
      id: z.uuid().describe("Id of the submission"),
      formId: z.uuid().describe("Id of the form"),
      values: z
        .array(
          z.object({
            formFieldId: z.uuid().describe("Id of the form field"),
            value: z.string().describe("Submitted value for the field"),
          }),
        )
        .nullable()
        .describe("User submitted values mapped to form fields"),
      submittedBy: z.uuid().nullable().describe("User who submitted the form"),
      createdAt: z.date().nullable().describe("Time of submission creation"),
      updatedAt: z.date().nullable().describe("Time of submission updation"),
    }),
  ),
});

// #endregion
