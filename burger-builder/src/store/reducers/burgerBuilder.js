import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  bacon: 0.7
};

const addIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);

  const updatedSState = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedSState);
};

const setIngredients = (state, action) => {
  const updatedSSState = {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    error: false,
    totalPrice: 4,
    building: false
  };
  return updateObject(state, updatedSSState);
};

const fetchIngredientFailed = (state, action) => {
  return updateObject(state, {
    error: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fetchIngredientFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
