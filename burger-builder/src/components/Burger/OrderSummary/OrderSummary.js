import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order:</h3>
      <p>A wonderful burger with the following:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Ready to Checkout?</p>
      <Button btnType="Danger" clicked={props.canceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        Continue
      </Button>
    </>
  );
};

export default orderSummary;
