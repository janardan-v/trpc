import { z } from "zod";

//#region FORM MODELS
export const createFormInput = z.object({
  title: z.string().min(6).max(55).describe("Title of the form"),
  description: z.string().max(300).describe("Description of the form").optional(),
  visibility: z
    .enum(["PUBLIC", "PRIVATE", "UNLISTED"])
    .describe("Visibility of the form")
    .default("PUBLIC"),
  isPublished: z.boolean().describe("Is the form published").default(false),
  password: z.string().describe("Password of the form").optional(),
  salt: z.string().describe("Salt of the password of form").optional(),
  deadline: z.coerce.date().describe("Deadline of the form"),
  adminId: z.uuid().describe("Admin of the form"),
});

export type CreateFormInputType = z.infer<typeof createFormInput>;

export const listFormByAdminIdInput = z.object({
  adminId: z.uuid().describe("If of Admin of the form"),
});

export type ListFormByAdminIdInputType = z.infer<typeof listFormByAdminIdInput>;

export const listFormsByFormIdInput = z.object({
  formId: z.uuid().describe("Id of the form"),
  password: z.string().describe("Password of the form").optional(),
});

export type ListFormsByFormIdInputType = z.infer<typeof listFormsByFormIdInput>;

export const listFormsByUserIdInput = z.object({
  userId: z.uuid().describe("Id of the user"),
});

export type ListFormsByUserIdInputType = z.infer<typeof listFormsByUserIdInput>;

export const updateFormInput = z.object({
  userId: z.uuid().describe("Id of the user trying to update the field"),
  formId: z.uuid().describe("Id of the form to be updated"),
  title: z.string().min(6).max(55).describe("Title of the form"),
  description: z.string().max(300).describe("Description of the form").optional(),
  visibility: z
    .enum(["PUBLIC", "PRIVATE", "UNLISTED"])
    .describe("Visibility of the form")
    .default("PUBLIC"),
  isPublished: z.boolean().describe("Is the form published").default(false),
  password: z.string().describe("Password of the form").optional(),
  deadline: z.coerce.date().describe("Deadline of the form"),
});

export type UpdateFormInputType = z.infer<typeof updateFormInput>;

export const deleteFormInput = z.object({
  userId: z.uuid().describe("Id of the user trying to delete the form"),
  formId: z.uuid().describe("Id of the form to be deleted"),
});

export type DeleteFormInputType = z.infer<typeof deleteFormInput>;

export const getPublicFormsInput = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(20),
  search: z.string().optional(),
  sortBy: z.enum(["NEWEST", "OLDEST", "DEADLINE"]).default("NEWEST"),
});

export type GetPublicFormsInputType = z.infer<typeof getPublicFormsInput>;

//#endregion

//#region FORM FIELDS MODELS
export const createFormFieldsInput = z
  .object({
    userId: z.uuid().describe("Id of user creating field"),

    formId: z.uuid().describe("Parent form id"),

    label: z.string().min(4).max(100),

    type: z.enum(["TEXT", "EMAIL", "NUMBER", "DATE", "SELECT", "CHECKBOX", "RATING"]),

    description: z.string().max(300).optional(),

    placeholder: z.string().max(100).optional(),

    isRequired: z.boolean().default(false),

    options: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),

    checkboxLabel: z.string().max(150).optional(),

    ratingMax: z.number().min(1).max(10).optional(),

    minValue: z.number().optional(),

    maxValue: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "SELECT" && (!data.options || data.options.length === 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "Select field requires options",
      });
    }

    if (data.type === "RATING" && !data.ratingMax) {
      ctx.addIssue({
        code: "custom",
        path: ["ratingMax"],
        message: "Rating max required",
      });
    }

    if (data.type === "CHECKBOX" && !data.checkboxLabel) {
      ctx.addIssue({
        code: "custom",
        path: ["checkboxLabel"],
        message: "Checkbox label required",
      });
    }

    if (
      data.type === "NUMBER" &&
      data.minValue != null &&
      data.maxValue != null &&
      data.minValue > data.maxValue
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["minValue"],
        message: "Min value cannot exceed max value",
      });
    }
  });

export type CreateFormFieldsInputType = z.infer<typeof createFormFieldsInput>;

export const updateFormFieldsInput = z
  .object({
    userId: z.uuid().describe("Id of user updating field"),

    fieldId: z.uuid(),

    label: z.string().min(4).max(100),

    type: z.enum(["TEXT", "EMAIL", "NUMBER", "DATE", "SELECT", "CHECKBOX", "RATING"]),

    description: z.string().max(300).optional(),

    placeholder: z.string().max(100).optional(),

    isRequired: z.boolean().default(false),

    options: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),

    checkboxLabel: z.string().max(150).optional(),

    ratingMax: z.number().min(1).max(10).optional(),

    minValue: z.number().optional(),

    maxValue: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "SELECT" && (!data.options || data.options.length === 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "Select field requires options",
      });
    }

    if (data.type === "RATING" && !data.ratingMax) {
      ctx.addIssue({
        code: "custom",
        path: ["ratingMax"],
        message: "Rating max required",
      });
    }

    if (data.type === "CHECKBOX" && !data.checkboxLabel) {
      ctx.addIssue({
        code: "custom",
        path: ["checkboxLabel"],
        message: "Checkbox label required",
      });
    }

    if (
      data.type === "NUMBER" &&
      data.minValue != null &&
      data.maxValue != null &&
      data.minValue > data.maxValue
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["minValue"],
        message: "Min value cannot exceed max value",
      });
    }
  });

export type UpdateFormFieldsInputType = z.infer<typeof updateFormFieldsInput>;

export const getFormFieldsInput = z.object({
  userId: z.uuid().describe("Id of the user trying to fetch the field"),
  formId: z.uuid().describe("Id of the form to fetch its field"),
});

export type GetFormFieldsInputType = z.infer<typeof getFormFieldsInput>;

export const deleteFormFieldsInput = z.object({
  userId: z.uuid().describe("Id of the user trying to delete the field"),
  fieldId: z.uuid().describe("Id of the field to be deleted"),
});

export type DeleteFormFieldsInputType = z.infer<typeof deleteFormFieldsInput>;
//#endregion

//#region FORM SUBMISSION MODELS

export const submitFormInput = z.object({
  formId: z.uuid().describe("Id of form"),
  userId: z.uuid().optional().describe("Submitting user"),
  browserFingerprint: z.string().optional().describe("Browser fingerprint"),
  values: z
    .array(
      z.object({
        formFieldId: z.uuid().describe("Field id"),
        value: z
          .union([z.string(), z.number(), z.boolean(), z.array(z.string())])
          .describe("Submitted field value"),
      }),
    )
    .min(1, "At least one field required"),
});
export type SubmitFormInputType = z.infer<typeof submitFormInput>;

export const getSubmissionsByFormIdInput = z.object({
  formId: z.uuid().describe("Id of the form to be submitted"),
  adminId: z.uuid().describe("Admin of the user fetching submissions of the form"),
});

export type GetSubmissionsByFormIdInputType = z.infer<typeof getSubmissionsByFormIdInput>;

//#endregion
