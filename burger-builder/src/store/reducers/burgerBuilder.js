import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );

      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      };
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENTS:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );

      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
      };
      return updateObject(state, updatedState);

    case actionTypes.SET_INGREDIENTS:
      const updatedState = {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
      };
      return updateObject(state, updatedState);
    case actionTypes.FETECH_INGREDIENT_FAILED:
      return updateObject(state, {
        error: true
      });
    default:
      return state;
  }
};

export default reducer;
