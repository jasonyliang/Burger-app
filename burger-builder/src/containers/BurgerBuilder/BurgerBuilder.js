import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    totalPrice: 4,
    purchasable: false,
    checkingout: false
  };

  updatePurchasability = updates => {
    const sum = Object.keys(updates)
      .map(igKey => {
        return updates[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
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
    this.updatePurchasability(updatedIngredient);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredient[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredient = {
      ...this.state.ingredient
    };
    updatedIngredient[type] = newCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceAddition;
    this.setState({ ingredient: updatedIngredient, totalPrice: updatedPrice });
    this.updatePurchasability(updatedIngredient);
  };

  checkoutHandler = () => {
    this.setState({ checkingout: true });
  };

  checkoutCancelHandler = () => {
    this.setState({ checkingout: false });
  };

  checkoutContinueHandler = () => {
    alert("You continued!");
  };

  render() {
    const disableInfo = {
      ...this.state.ingredient
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <>
        <Modal
          show={this.state.checkingout}
          modalClosed={this.checkoutCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredient}
            canceled={this.checkoutCancelHandler}
            continued={this.checkoutContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredient} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          curPrice={this.state.totalPrice.toFixed(2)}
          purchasable={this.state.purchasable}
          checkout={this.checkoutHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
