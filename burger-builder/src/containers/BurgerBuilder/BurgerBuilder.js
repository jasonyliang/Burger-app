import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    // purchasable: false,
    checkingout: false
  };
  componentDidMount() {
    this.props.onInitIngredient();
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
    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  };

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredient[type];
  //   const newCount = oldCount + 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredient
  //   };
  //   updatedIngredient[type] = newCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = oldPrice + priceAddition;
  //   this.setState({ ingredient: updatedIngredient, totalPrice: updatedPrice });
  //   this.updatePurchasability(updatedIngredient);
  // };
  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredient[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const newCount = oldCount - 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredient
  //   };
  //   updatedIngredient[type] = newCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = oldPrice - priceAddition;
  //   this.setState({ ingredient: updatedIngredient, totalPrice: updatedPrice });
  //   this.updatePurchasability(updatedIngredient);
  // };

  checkoutHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ checkingout: true });
    } else {
      this.props.history.push("/auth");
    }
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
    // const queryParams = [];
    // for (let i in this.state.ingredient) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredient[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    this.props.onInitPurcahsed();
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      ...this.props.ings
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            curPrice={this.props.tprice.toFixed(2)}
            purchasable={this.updatePurchasability(this.props.ings)}
            checkout={this.checkoutHandler}
            isAuth={this.props.isAuthenticated}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          canceled={this.checkoutCancelHandler}
          continued={this.checkoutContinueHandler}
          price={this.props.tprice}
        />
      );
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    tprice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurcahsed: () => dispatch(actions.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
