// import { normalize } from "normalizr";
import { RESTAURANT_FETCHED } from "../types";
import api from "../api";
// import { restaurantSchema } from "../schemas";
// data.entities.restaurants
const restaurantsFetched = data => ({
  type: RESTAURANT_FETCHED,
  data
});
// const restaurantCreated = data => ({
//   type: BOOK_CREATED,
//   data
// });
export const fetchRestaurants = () => dispatch =>
  api.restaurants
    .fetchAll()
    .then(restaurants => dispatch(restaurantsFetched(restaurants)));
// export const createRestaurant = data => dispatch =>
//   api.restaurants
//     .create(data)
//     .then(restaurant => dispatch(restaurantCreated(normalize(restaurant, restaurantSchema))));