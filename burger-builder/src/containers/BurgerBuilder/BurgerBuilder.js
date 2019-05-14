import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 4,
    purchasable: false,
    checkingout: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    // axios
    //   .get("https://react-burger-project-f4954.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredient: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: error });
    //   });
  }
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
    // alert("You continued!");
    // this.setState({ loading: true });
    // const order = {
    //   incredient: this.state.ingredient,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "XDD",
    //     address: {
    //       street: "test street",
    //       zipCode: "42134",
    //       country: "South Korea"
    //     },
    //     email: "Test@email.com"
    //   },
    //   delivery: "Fastest"
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasable: false });
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, purchasable: false });
    //   });

    // this.props.history.push("/checkout");
    const queryParams = [];
    for (let i in this.state.ingredient) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredient[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredient
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredient) {
      burger = (
        <>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredient}
          canceled={this.checkoutCancelHandler}
          continued={this.checkoutContinueHandler}
          price={this.state.totalPrice}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <>
        <Modal
          show={this.state.checkingout}
          modalClosed={this.checkoutCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
