import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let identifier in this.state.orderForm) {
      formData[identifier] = this.state.orderForm[identifier].value;
    }
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ings,
      price: this.props.tprice,
      orderData: formData,
      userID: this.props.userID
    };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    if (updatedForm[inputIdentifier].validation) {
      updatedFormElement.valid = this.checkValidity(
        event.target.value,
        updatedFormElement.validation
      );
      updatedFormElement.touched = true;
    }

    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let identifier in updatedForm) {
      formIsValid = updatedForm[identifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(el => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={event => this.inputChangedHandler(event, el.id)}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    tprice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
