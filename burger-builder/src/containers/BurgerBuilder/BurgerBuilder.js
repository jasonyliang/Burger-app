import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };
  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredient} />
        <div>Build Control</div>
      </>
    );
  }
}

export default BurgerBuilder;
