import React from "react";

import Burger from "../../Burger/Burger";
import Buttons from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto", overflow: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Buttons btnType="Danger" clicked={props.onCheckoutCancelled}>
        Cancel
      </Buttons>
      <Buttons btnType="Success" clicked={props.onCheckoutContinued}>
        Continue
      </Buttons>
    </div>
  );
};

export default CheckoutSummary;
