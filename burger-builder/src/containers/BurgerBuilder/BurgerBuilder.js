import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    }
  };
  render() {
    return (
      <>
        <Burger ingredient={this.state.ingredient} />
        <div>Build Control</div>
      </>
    );
  }
}

export default BurgerBuilder;
