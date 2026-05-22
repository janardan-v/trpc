import { db, eq, max, and, asc, desc } from "@repo/database";
import { formsTable, formSubmissionsTable, formFieldsTable } from "@repo/database/schema";
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

    const {
      title,
      description,
      visibility,
      isPublished,
      isPasswordProtected,
      password,
      deadline,
      adminId,
    } = data.data;

    const createdForm = await db
      .insert(formsTable)
      .values({
        title,
        description,
        visibility,
        isPublished,
        isPasswordProtected,
        password,
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

  public async listFormByAdminId(payload: ListFormByAdminIdInputType) {
    const data = listFormByAdminIdInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const forms = await db
      .select({})
      .from(formsTable)
      .where(eq(formsTable.adminId, data.data.adminId));

    if (!forms || forms.length === 0) throw new Error("No forms found, create your first form");

    return {
      forms,
    };
  }

  public async listFormsByFormId(payload: ListFormsByFormIdInputType) {
    const data = listFormsByFormIdInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);
    const { formId } = data.data;

    const rows = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
        deadline: formsTable.deadline,
        field: {
          fieldId: formFieldsTable.id,
          lable: formFieldsTable.label,
          lableKey: formFieldsTable.labelKey,
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

    const { id, title, description, createdAt, updatedAt, deadline } = rows[0]!;
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

    const forms = await db
      .select()
      .from(formSubmissionsTable)
      .where(eq(formSubmissionsTable.submiitedBy, data.data.userId));

    if (forms.length === 0) throw new Error("No forms found");

    return {
      forms,
    };
  }

  public async updateForm(payload: UpdateFormInputType) {
    const data = updateFormInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);

    const {
      userId,
      formId,
      title,
      visibility,
      description,
      isPublished,
      isPasswordProtected,
      password,
      deadline,
    } = data.data;

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
        isPasswordProtected,
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

  //#endregion

  //#region  FORM FIELDS OPERATIONS
  public async createFormFields(payload: CreateFormFieldsInputType) {
    const data = createFormFieldsInput.safeParse(payload);

    if (!data.success) throw new Error(data.error.message);
    const { data: feildData } = data;

    const { formId, label, type, description, placeholder, isRequired } = feildData;
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

    const { formId } = data.data;

    const form = await db
      .select({
        id: formsTable.id,
      })
      .from(formsTable)
      .where(eq(formsTable.id, formId));

    if (!form[0]) throw new Error("Form not found");

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

    const { formId, userId, values } = data.data;

    const result = await db
      .insert(formSubmissionsTable)
      .values({
        formId,
        values,
        submiitedBy: userId ? userId : null,
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

    const submissions = await db
      .select({
        id: formSubmissionsTable.id,

        formId: formSubmissionsTable.formId,

        values: formSubmissionsTable.values,

        submittedBy: formSubmissionsTable.submiitedBy,

        createdAt: formSubmissionsTable.createdAt,

        updatedAt: formSubmissionsTable.updatedAt,
      })
      .from(formSubmissionsTable)

      .innerJoin(formsTable, eq(formSubmissionsTable.formId, formsTable.id))

      .where(
        and(
          eq(formSubmissionsTable.formId, formId),

          eq(formsTable.adminId, adminId),
        ),
      )
      .orderBy(desc(formSubmissionsTable.createdAt));

    return {
      submissions,
    };
  }

  //#endregion
}

export default FormServices;
