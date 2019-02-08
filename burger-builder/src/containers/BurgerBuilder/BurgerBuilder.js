import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };
  addIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    const newCount = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredient
    };
    updatedIngredient[type] = newCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;
    this.setState({ ingredient: updatedIngredient, totalPrice: updatedPrice });
  };
  removeIngredientHandler = type => {};
  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredient} />
        <BuildControls ingredientAdded={this.addIngredientHandler} />
      </>
    );
  }
}

export default BurgerBuilder;
