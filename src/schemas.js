import { schema } from "normalizr";
export const restaurantSchema = new schema.Entity(
  "restaurants",
  {},
  { idAttribute: "_id" }
);