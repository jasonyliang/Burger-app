import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      PostalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      incredient: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "XDD",
        address: {
          street: "test street",
          zipCode: "42134",
          country: "South Korea"
        },
        email: "Test@email.com"
      },
      delivery: "Fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="Name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="Email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="Street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="Postal Code"
          placeholder="Your Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data:</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
