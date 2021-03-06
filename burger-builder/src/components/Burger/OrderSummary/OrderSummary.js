import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // componentWillUpdate() {
  //   console.log("[Order Summary] will update");
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <>
        <h3>Your Order:</h3>
        <p>A wonderful burger with the following:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Ready to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.canceled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.continued}>
          Continue
        </Button>
      </>
    );
  }
}

export default OrderSummary;
