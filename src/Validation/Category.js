import { string, object, number } from "yup";
export const addNewSubCategory = (id) =>
  object({
    title: string("Invalid title ").required("title is required"),
    image: string().notRequired(),
    description: string("Invalid title").notRequired(),
    category_id: number().default(Number(id)),
  });
