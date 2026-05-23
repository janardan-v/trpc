import {
  createFormFieldsInputModel,
  createFormFieldsOutputModel,
  createFormInputModel,
  createFormOutputModel,
  deleteFormFieldsInputModel,
  deleteFormFieldsOutputModel,
  deleteFormInputModel,
  deleteFormOutputModel,
  getFormFieldsInputModel,
  getFormFieldsOutputModel,
  getPublicFormsInputModel,
  getPublicFormsOutputModel,
  getSubmissionsByFormIdInputModel,
  getSubmissionsByFormIdOutputModel,
  listFormByAdminIdOutputModel,
  listFormsByFormIdInputModel,
  listFormsByFormIdOutputModel,
  listFormsByUserIdOutputModel,
  submitFormInputModel,
  submitFormOutputModel,
  updateFormFieldsInputModel,
  updateFormFieldsOutputModel,
  updateFormInputModel,
  updateFormOutputModel,
} from "./model";

import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { setAuthenticationCookie } from "../../utils/cookie.js";
import { formService } from "../../services";
import { getPublicFormsInput } from "@repo/services/form/model";

const TAGS = ["FORMS"];
const getPath = generatePath("/forms");

export const formRouter = router({
  createForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create-form"),
        tags: TAGS,
      },
    })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const {
        title,
        description,
        visibility,
        isPublished,
        isPasswordProtected,
        password,
        deadline,
      } = input;
      const { id } = ctx.user;
      const { formId, adminId } = await formService.createForm({
        title,
        description,
        visibility,
        isPublished,
        password,
        deadline,
        adminId: id,
      });

      return {
        formId,
        adminId,
      };
    }),

  listFormByAdminId: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/list-form-by-admin-id"),
        tags: TAGS,
      },
    })
    .output(listFormByAdminIdOutputModel)
    .query(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const result = await formService.listFormsByAdminId({
        adminId: id,
      });

      return {
        forms: result.forms,
      };
    }),

  listFormByFormId: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/list-form-by-form-id"),
        tags: TAGS,
      },
    })
    .input(listFormsByFormIdInputModel)
    .output(listFormsByFormIdOutputModel)
    .query(async ({ input, ctx }) => {
      // const { id } = ctx.user?.id;

      const { formId } = input;
      const result = await formService.listFormByFormId({
        formId,
      });

      return result;
    }),

  listFormsByUserId: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/list-form-by-user-id"),
        tags: TAGS,
      },
    })
    .output(listFormsByUserIdOutputModel)
    .query(async ({ input, ctx }) => {
      const { id } = ctx.user;

      const result = await formService.listFormsByUserId({
        userId: id,
      });

      return result.history;
    }),

  updateForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/update-form"),
        tags: TAGS,
      },
    })
    .input(updateFormInputModel)
    .output(updateFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const result = await formService.updateForm({
        ...input,
        userId: id,
      });

      return result;
    }),

  deleteForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/delete-form"),
        tags: TAGS,
      },
    })
    .input(deleteFormInputModel)
    .output(deleteFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const result = await formService.deleteForm({
        ...input,
        userId: id,
      });

      return result;
    }),

  createFormFields: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create-form-fields"),
        tags: TAGS,
      },
    })
    .input(createFormFieldsInputModel)
    .output(createFormFieldsOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const result = await formService.createFormFields({
        ...input,
        userId: id,
      });

      return result;
    }),

  updateFormFields: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/update-form-fields"),
        tags: TAGS,
      },
    })
    .input(updateFormFieldsInputModel)
    .output(updateFormFieldsOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const result = await formService.updateFormFields({
        ...input,
        userId: id,
      });

      return result;
    }),

  getFormFields: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/get-form-fields"),
        tags: TAGS,
      },
    })
    .input(getFormFieldsInputModel)
    .output(getFormFieldsOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const result = await formService.getFormFields({
        ...input,
        userId: id,
      });

      return result;
    }),

  deleteFormFields: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/delete-form-fields"),
        tags: TAGS,
      },
    })
    .input(deleteFormFieldsInputModel)
    .output(deleteFormFieldsOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const result = await formService.deleteFormFields({
        ...input,
        userId: id,
      });

      return result;
    }),

  getSubmissionsByFormId: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/submissions-by-form-id"),
        tags: TAGS,
      },
    })
    .input(getSubmissionsByFormIdInputModel)
    .output(getSubmissionsByFormIdOutputModel)
    .query(async ({ input, ctx }) => {
      const { formId } = input;
      const { id } = ctx.user;
      const result = await formService.getSubmissionsByFormId({
        formId,
        adminId: id,
      });
      return result;
    }),

  submitForm: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/submit-form"),
        tags: TAGS,
      },
    })
    .input(submitFormInputModel)
    .output(submitFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const id = ctx.user?.id;
      const result = await formService.submitForm({
        ...input,
        userId: id,
      });

      return result;
    }),

  getPublicForms: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/public-forms"),
        tags: TAGS,
      },
    })
    .input(getPublicFormsInputModel)
    .output(getPublicFormsOutputModel)
    .query(async ({ input }) => {
      const { page, limit, search, sortBy } = input;
      const result = await formService.getPublicForms({
        page,
        limit,
        search,
        sortBy,
      });
      return result;
    }),
});
