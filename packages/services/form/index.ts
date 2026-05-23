import { db, eq, max, and, asc, desc, or, gt, isNull, ilike } from "@repo/database";
import {
  formsTable,
  formSubmissionsTable,
  formFieldsTable,
  visibilityEnum,
} from "@repo/database/schema";
import {
  type ListFormsByFormIdInputType,
  type ListFormByAdminIdInputType,
  type CreateFormInputType,
  type ListFormsByUserIdInputType,
  type CreateFormFieldsInputType,
  type UpdateFormFieldsInputType,
  type DeleteFormFieldsInputType,
  type UpdateFormInputType,
  type DeleteFormInputType,
  type GetFormFieldsInputType,
  type SubmitFormInputType,
  type GetSubmissionsByFormIdInputType,
  GetPublicFormsInputType,
  getPublicFormsInput,
} from "./model";
import {
  createFormInput,
  listFormsByFormIdInput,
  listFormByAdminIdInput,
  updateFormFieldsInput,
  listFormsByUserIdInput,
  createFormFieldsInput,
  deleteFormFieldsInput,
  updateFormInput,
  deleteFormInput,
  getFormFieldsInput,
  submitFormInput,
  getSubmissionsByFormIdInput,
} from "./model";
import generateHash from "../utils/generateHash";
import crypto from "crypto";
const toLabelKey = (label: string) => {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove special chars
    .replace(/\s+/g, "_"); // multiple spaces → one _
};

class FormServices {
  // Private
  private async getNextIndex(formId: string) {
    const result = await db
      .select({ maxIndex: max(formFieldsTable.index) })
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, formId));

    const current = result[0]?.maxIndex;
    const next = current ? parseFloat(current) + 1 : 1;

    return next.toFixed(2);
  }

  // Public

  //#region FORM OPERATIONS
  public async createForm(payload: CreateFormInputType) {
    const data = createFormInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const { title, description, visibility, isPublished, password, deadline, adminId } = data.data;

    if (visibility === "PRIVATE" && !password) throw new Error("Password is required");

    let salt: string | null = null;
    let hasPassword: string | null = null;
    if (visibility === "PRIVATE" && password) {
      salt = crypto.randomBytes(16).toString("hex");
      hasPassword = await generateHash(salt, password);
      console.log(hasPassword);
    }

    if (deadline && deadline < new Date()) throw new Error("Deadline cannot be in the past");
    const createdForm = await db
      .insert(formsTable)
      .values({
        title,
        description,
        visibility,
        isPublished,
        password: visibility === "PRIVATE" ? hasPassword : null,
        salt,
        deadline,
        adminId,
      })
      .returning({
        id: formsTable.id,
        adminId: formsTable.adminId,
      });

    if (!createdForm || createdForm.length === 0 || !createdForm[0]?.id)
      throw new Error("Something went wrong while creating your form");

    return {
      formId: createdForm[0].id,
      adminId: createdForm[0].adminId,
    };
  }

  public async listFormsByAdminId(payload: ListFormByAdminIdInputType) {
    const data = listFormByAdminIdInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const forms = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        deadline: formsTable.deadline,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
        visibility: formsTable.visibility,
        isPublished: formsTable.isPublished,
      })
      .from(formsTable)
      .where(eq(formsTable.adminId, data.data.adminId));

    if (!forms || forms.length === 0) throw new Error("No forms found, create your first form");

    return {
      forms,
    };
  }

  public async listFormByFormId(payload: ListFormsByFormIdInputType) {
    const data = listFormsByFormIdInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);
    const { formId, password } = data.data;

    const rows = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
        deadline: formsTable.deadline,
        hashpassword: formsTable.password,
        salt: formsTable.salt,
        visibility: formsTable.visibility,
        isPublished: formsTable.isPublished,
        field: {
          fieldId: formFieldsTable.id,
          label: formFieldsTable.label,
          labelKey: formFieldsTable.labelKey,
          type: formFieldsTable.type,
          description: formFieldsTable.description,
          placeholder: formFieldsTable.placeholder,
          index: formFieldsTable.index,
          isRequired: formFieldsTable.isRequired,
        },
      })
      .from(formsTable)
      .leftJoin(formFieldsTable, eq(formFieldsTable.formId, formsTable.id))
      .where(eq(formsTable.id, formId))
      .orderBy(asc(formFieldsTable.index));

    if (!rows || rows.length === 0) throw new Error("No forms found");

    const {
      id,
      title,
      description,
      createdAt,
      updatedAt,
      deadline,
      hashpassword,
      salt,
      visibility,
      isPublished,
    } = rows[0]!;

    if (visibility === "PRIVATE") {
      if (!password) throw new Error("Password is required");
      else {
        const userPassword = await generateHash(salt, password);
        if (userPassword !== hashpassword) throw new Error("Incorrect password");
      }
    }
    if (!isPublished) throw new Error("Form is not published");

    if (deadline && deadline < new Date()) throw new Error("Form is closed");

    const field = rows
      .filter((row) => row.field?.fieldId !== null)
      .map((row) => row.field as NonNullable<typeof row.field>);

    return {
      id,
      title,
      description,
      createdAt,
      updatedAt,
      deadline,
      field,
    };
  }

  public async listFormsByUserId(payload: ListFormsByUserIdInputType) {
    const data = listFormsByUserIdInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const rows = await db
      .select({
        submissionId: formSubmissionsTable.id,
        submittedAt: formSubmissionsTable.createdAt,
        form: {
          formId: formsTable.id,
          title: formsTable.title,
          description: formsTable.description,
          deadline: formsTable.deadline,
        },
      })
      .from(formSubmissionsTable)
      .innerJoin(formsTable, eq(formSubmissionsTable.formId, formsTable.id))
      .where(eq(formSubmissionsTable.submittedBy, data.data.userId))
      .orderBy(desc(formSubmissionsTable.createdAt));

    return {
      history: rows,
    };
  }

  public async updateForm(payload: UpdateFormInputType) {
    const data = updateFormInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const { userId, formId, title, visibility, description, isPublished, password, deadline } =
      data.data;

    const formsFromDB = await db.select().from(formsTable).where(eq(formsTable.id, formId));

    if (!formsFromDB[0]) throw new Error("Form not found");

    if (userId !== formsFromDB[0].adminId) throw new Error("Unauthorized to update form");

    const updatedForm = await db
      .update(formsTable)
      .set({
        title,
        visibility,
        description,
        isPublished,
        password,
        deadline,
      })
      .where(and(eq(formsTable.id, formId), eq(formsTable.adminId, userId)))
      .returning({
        id: formsTable.id,
        adminId: formsTable.adminId,
      });

    if (!updatedForm[0]) throw new Error("Something went wrong while updating your form");

    return {
      formId: updatedForm[0].id,
      adminId: updatedForm[0].adminId,
    };
  }

  public async deleteForm(payload: DeleteFormInputType) {
    const data = deleteFormInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const { userId, formId } = data.data;

    const formsFromDB = await db.select().from(formsTable).where(eq(formsTable.id, formId));

    if (!formsFromDB[0]) throw new Error("Form not found");

    if (userId !== formsFromDB[0].adminId) throw new Error("Unauthorized to delete form");

    await db.delete(formsTable).where(eq(formsTable.id, formId));

    return {
      formId,
      success: true,
    };
  }

  public async getPublicForms(payload: GetPublicFormsInputType) {
    const data = getPublicFormsInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);
    const { limit, page, sortBy, search } = data.data;
    const offset = (page - 1) * limit;
    const filters = [
      eq(formsTable.visibility, "PUBLIC"),
      eq(formsTable.isPublished, true),
      or(isNull(formsTable.deadline), gt(formsTable.deadline, new Date())),
    ];
    if (search) {
      filters.push(
        or(
          ilike(formsTable.title, `%${search}%`),

          ilike(formsTable.description, `%${search}%`),
        ),
      );
    }

    let ordering;
    switch (sortBy) {
      case "OLDEST":
        ordering = asc(formsTable.createdAt);
        break;
      case "DEADLINE":
        ordering = asc(formsTable.deadline);
        break;
      case "NEWEST":
      default:
        ordering = desc(formsTable.createdAt);
    }
    const result = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        deadline: formsTable.deadline,
        createdAt: formsTable.createdAt,
      })
      .from(formsTable)
      .where(and(...filters))
      .orderBy(ordering)
      .limit(limit + 1)
      .offset(offset);

    return {
      forms: result.slice(0, limit),

      pagination: {
        page,
        limit,
        hasMore: result.length > limit,
      },
    };
  }

  //#endregion

  //#region  FORM FIELDS OPERATIONS
  public async createFormFields(payload: CreateFormFieldsInputType) {
    const data = createFormFieldsInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);
    const { data: feildData } = data;

    const { userId, formId, label, type, description, placeholder, isRequired } = feildData;

    const adminId = await db.select({ adminId: formsTable.adminId }).from(formsTable);

    if (userId !== adminId[0]?.adminId) throw new Error("Unauthorized");

    const labelKey = toLabelKey(label);

    const index = await this.getNextIndex(formId);

    const createdField = await db
      .insert(formFieldsTable)
      .values({
        formId,
        label,
        labelKey,
        index,
        type,
        description,
        isRequired,
        placeholder,
      })
      .returning({
        id: formFieldsTable.id,
        formId: formFieldsTable.formId,
      });

    if (!createdField || createdField.length === 0 || !createdField[0])
      throw new Error("Something went wrong while creating your form field");

    return {
      fieldId: createdField[0].id,
      formId: createdField[0].formId,
    };
  }

  public async updateFormFields(payload: UpdateFormFieldsInputType) {
    const data = updateFormFieldsInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const { data: fieldData } = data;

    const { userId, fieldId, label, type, description, placeholder, isRequired } = fieldData;

    const field = await db
      .select({
        fieldId: formFieldsTable.id,
        adminId: formsTable.adminId,
      })
      .from(formFieldsTable)
      .innerJoin(formsTable, eq(formFieldsTable.formId, formsTable.id))
      .where(eq(formFieldsTable.id, fieldId));

    if (!field[0]) throw new Error("Field not found");

    if (field[0].adminId !== userId) throw new Error("Unauthorized");

    const updatedField = await db
      .update(formFieldsTable)
      .set({
        label,
        type,
        description,
        placeholder,
        isRequired,
      })
      .where(eq(formFieldsTable.id, fieldId))
      .returning({
        id: formFieldsTable.id,
        formId: formFieldsTable.formId,
      });

    if (!updatedField || updatedField.length === 0 || !updatedField[0])
      throw new Error("Something went wrong while updating your form field");

    return {
      fieldId: updatedField[0].id,
      formId: updatedField[0].formId,
      success: true,
    };
  }

  public async deleteFormFields(payload: DeleteFormFieldsInputType) {
    const data = deleteFormFieldsInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const { userId, fieldId } = data.data;

    const field = await db
      .select({
        fieldId: formFieldsTable.id,
        adminId: formsTable.adminId,
      })
      .from(formFieldsTable)
      .innerJoin(formsTable, eq(formFieldsTable.formId, formsTable.id))
      .where(eq(formFieldsTable.id, fieldId));

    if (!field[0]) throw new Error("Field not found");

    if (field[0].adminId !== userId) throw new Error("Unauthorized");

    const updatedField = await db
      .delete(formFieldsTable)
      .where(eq(formFieldsTable.id, fieldId))
      .returning({
        fieldsTableid: formFieldsTable.id,
        formId: formFieldsTable.formId,
      });

    if (!updatedField || updatedField.length === 0 || !updatedField[0])
      throw new Error("Something went wrong while deleting your form field");

    return {
      fieldId: updatedField[0].fieldsTableid,
      formId: updatedField[0].formId,
      success: true,
    };
  }

  public async getFormFields(payload: GetFormFieldsInputType) {
    const data = getFormFieldsInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const { formId, userId } = data.data;

    const form = await db
      .select({
        id: formsTable.id,
        adminId: formsTable.adminId,
      })
      .from(formsTable)
      .where(eq(formsTable.id, formId));

    if (!form[0]) throw new Error("Form not found");
    if (userId !== form[0].adminId) throw new Error("Unauthorized to access fields");

    const fields = await db
      .select({
        id: formFieldsTable.id,
        formId: formFieldsTable.formId,
        label: formFieldsTable.label,
        labelKey: formFieldsTable.labelKey,
        type: formFieldsTable.type,
        description: formFieldsTable.description,
        placeholder: formFieldsTable.placeholder,
        isRequired: formFieldsTable.isRequired,
        index: formFieldsTable.index,
        createdAt: formFieldsTable.createdAt,
        updatedAt: formFieldsTable.updatedAt,
      })
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, formId))
      .orderBy(asc(formFieldsTable.index));

    return fields;
  }

  //#endregion

  //#region SUBMISSIONS SERVICES
  public async submitForm(payload: SubmitFormInputType) {
    const data = submitFormInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const { formId, userId, values, browserFingerprint } = data.data;

    //check if form exist or not, published or not and deadline is not passed yet
    const form = await db
      .select({
        id: formsTable.id,
        isPublished: formsTable.isPublished,
        deadline: formsTable.deadline,
      })
      .from(formsTable)
      .where(eq(formsTable.id, formId));

    if (!form[0]) throw new Error("Form not found");
    if (!form[0].isPublished) throw new Error("Form not published");
    if (form[0].deadline && form[0].deadline < new Date()) throw new Error("Form closed");

    //valdiate fields belong to same form only
    const fields = await db
      .select({
        id: formFieldsTable.id,
        isRequired: formFieldsTable.isRequired,
      })
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, formId));

    const valid = new Set(fields.map((f) => f.id));
    for (const value of values) {
      if (!valid.has(value.formFieldId)) throw new Error("Invalid field");
    }

    // duplicate fields
    const seen = new Set<string>();

    for (const value of values) {
      if (seen.has(value.formFieldId)) {
        throw new Error("Duplicate field submission");
      }

      seen.add(value.formFieldId);
    }

    //validate required fields are sent necessarily
    const submitted = new Map(values.map((v) => [v.formFieldId, v.value]));

    for (const field of fields) {
      if (field.isRequired && !submitted.get(field.id)?.trim()) {
        throw new Error("Required field missing");
      }
    }

    //check unique submissions
    let alreadySubmitted;
    if (userId) {
      alreadySubmitted = await db
        .select()
        .from(formSubmissionsTable)
        .where(
          and(
            eq(formSubmissionsTable.formId, formId),
            eq(formSubmissionsTable.submittedBy, userId),
          ),
        );
    } else {
      if (!browserFingerprint) throw new Error("Browser fingerprint not provided");

      alreadySubmitted = await db
        .select()
        .from(formSubmissionsTable)
        .where(
          and(
            eq(formSubmissionsTable.formId, formId),
            eq(formSubmissionsTable.browserFingerprint, browserFingerprint),
          ),
        );
    }
    if (alreadySubmitted.length > 0) throw new Error("You have already submitted this form");

    const result = await db
      .insert(formSubmissionsTable)
      .values({
        formId,
        values,
        submittedBy: userId ? userId : null,
        browserFingerprint,
      })
      .returning({
        id: formSubmissionsTable.id,
        formId: formSubmissionsTable.formId,
      });

    if (!result || result.length === 0 || !result[0])
      throw new Error("Something went wrong while submitting your form");

    return {
      id: result[0].id,
      formId: result[0].formId,
      success: true,
    };
  }

  public async getSubmissionsByFormId(payload: GetSubmissionsByFormIdInputType) {
    const data = getSubmissionsByFormIdInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const { formId, adminId } = data.data;
    const form = await db
      .select({
        id: formsTable.id,
      })
      .from(formsTable)
      .where(
        and(
          eq(formsTable.id, formId),

          eq(formsTable.adminId, adminId),
        ),
      );

    if (!form[0]) {
      throw new Error("Unauthorized");
    }

    const submissions = await db
      .select({
        id: formSubmissionsTable.id,
        formId: formSubmissionsTable.formId,
        values: formSubmissionsTable.values,
        submittedBy: formSubmissionsTable.submittedBy,
        createdAt: formSubmissionsTable.createdAt,
        updatedAt: formSubmissionsTable.updatedAt,
      })
      .from(formSubmissionsTable)
      .innerJoin(formsTable, eq(formSubmissionsTable.formId, formsTable.id))
      .where(and(eq(formSubmissionsTable.formId, formId), eq(formsTable.adminId, adminId)))
      .orderBy(desc(formSubmissionsTable.createdAt));

    return {
      submissions,
    };
  }

  //#endregion
}

export default FormServices;
