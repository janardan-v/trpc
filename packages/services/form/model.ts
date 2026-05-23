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
  deadline: z.date().describe("Deadline of the form"),
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
  deadline: z.date().describe("Deadline of the form"),
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
export const createFormFieldsInput = z.object({
  userId: z.uuid().describe("Id of the user trying to create the field"),
  formId: z.uuid().describe("Id of the parent form"),
  label: z.string().min(4).max(100).describe("Label of the field"),

  type: z.enum(["TEXT", "EMAIL", "NUMBER", "DATE", "SELECT", "CHECKBOX", "RATING"]),

  description: z.string().max(300).describe("Description of the field").optional(),
  placeholder: z.string().max(100).describe("Placeholder of the field").optional(),

  isRequired: z.boolean().describe("Is the field required").default(false),
});

export type CreateFormFieldsInputType = z.infer<typeof createFormFieldsInput>;

export const updateFormFieldsInput = z.object({
  userId: z.uuid().describe("Id of the user trying to update the field"),
  fieldId: z.uuid().describe("Id of the field to be updated"),
  label: z.string().min(4).max(100).describe("Label of the field"),

  type: z.enum(["TEXT", "EMAIL", "NUMBER", "DATE", "SELECT", "CHECKBOX", "RATING"]),

  description: z.string().max(300).describe("Description of the field").optional(),
  placeholder: z.string().max(100).describe("Placeholder of the field").optional(),

  isRequired: z.boolean().describe("Is the field required").default(false),
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
  formId: z.uuid().describe("Id of the form to be submitted"),
  userId: z.uuid().describe("Id of the user submitting the form").optional(),
  browserFingerprint: z.string().describe("Fingerprint of the browser").optional(),
  values: z
    .array(
      z.object({
        formFieldId: z.uuid().describe("Id of the field"),
        value: z.string().describe("Value of the field"),
      }),
    )
    .min(1, "Atleast one field is requierd to submit"),
});

export type SubmitFormInputType = z.infer<typeof submitFormInput>;

export const getSubmissionsByFormIdInput = z.object({
  formId: z.uuid().describe("Id of the form to be submitted"),
  adminId: z.uuid().describe("Admin of the user fetching submissions of the form"),
});

export type GetSubmissionsByFormIdInputType = z.infer<typeof getSubmissionsByFormIdInput>;

//#endregion
