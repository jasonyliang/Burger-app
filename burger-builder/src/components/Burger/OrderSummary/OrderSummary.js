import React from "react";

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
      <p>Ready to Checkout?</p>
      <button>Cancel</button>
      <button>Continue</button>
    </>
  );
};

export default orderSummary;
