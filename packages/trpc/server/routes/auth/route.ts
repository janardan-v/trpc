import { createUserWithEmailAndPasswordInputModel, createUserWithEmailAndPasswordOutputModel } from "./model.js";
import { userService } from "../../services/index.js";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create-user-with-email-and-password"),
        tags: TAGS
      }
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .query(async ({ input }) => {
      const result = await userService.createUserWithEmailAndPassword(input)
      return {
        id: result.id
      };
    }),
});
