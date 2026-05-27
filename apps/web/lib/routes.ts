export const ROUTES = {

  DASHBOARD:
    "/dashboard",

  LOGIN:
    "/login",

  SIGNUP:
    "/signup",

  PROFILE:
    "/profile",

  FORMS:
    "/forms",

  CREATE_FORM:
    "/forms/create",

  FORM: (
    id: string,
  ) =>
    `/form/${id}`,

  FORM_EDIT: (
    id: string,
  ) =>
    `/forms/${id}/edit`,

  FORM_SUBMISSIONS: (
    id: string,
  ) =>
    `/forms/${id}/submissions`,

}