// import { createSelector } from "reselect";
import { RESTAURANT_FETCHED, RESTAURANT_CREATED } from "../types";

export default function Restaurants(state = {}, action = {}) {
  switch (action.type) {
    case RESTAURANT_FETCHED:
      return action.restaurants;
    case RESTAURANT_CREATED:
      return { ...state, ...action.data.entities.Restaurants };
    default:
      return state;
  }
}
