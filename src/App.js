import React, { useEffect, useState } from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";
import Form from "./Form";
import Help from "./Help";
import Confirmation from "./Confirmation";
import * as yup from "yup";
import schema from "./Validation/form_schema";
import axios from "axios";

const StyledHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 8rem;
  h1 {
    color: red;
    font-size: 2.5rem;
    margin: auto 2rem;
    text-transform: uppercase;
  }
  nav {
    display: flex;
    align-items: center;
    a {
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
      text-decoration: none;
      color: black;
      width: 12rem;
      text-align: center;
      line-height: 3rem;
      font-size: 1.5rem;
      &:hover {
        background-color: red;
        color: white;
      }
      &:first-child {
        border-left: 1px solid #333;
      }
    }
  }
`;

// Initial States:::
const initialFormValues = {
  name: "",
  size: "",
  pepperoni: false,
  sausage: false,
  bacon: false,
  pineapple: false,
  garlic: false,
  mushrooms: false,
  peppers: false,
  cranberries: false,
  instructions: "",
};

const initialFormErrors = {
  name: "",
  size: "",
  toppings: "",
};

const initialDisabled = true;
const initialOrders = [];

const App = () => {
  // State Hooks:
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [orders, setOrders] = useState(initialOrders);

  // Render Confirmation after Order Submission
  const history = useHistory();

  const routeToConfirmation = () => {
    history.push("/confirmation");
  };

  // Submit Pizza Order Function
  const submitNewOrder = (order) => {
    // Execute post request
    // If post request is successful,
    // add the order to the orders data (here simulated as a slice of state), and
    // display the confirmation route with order details
    axios
      .post("https://reqres.in/api/users", order)
      .then((res) => {
        console.log(res);
        setOrders([...orders, res.data]);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setFormValues(initialFormValues);
        routeToConfirmation();
      });
  };

  // Validation Helper for Errors:
  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((e) => setFormErrors({ ...formErrors, [name]: e.errors[0] }));
  };

  // Helper Functions
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      pepperoni: formValues.pepperoni,
      sausage: formValues.sausage,
      bacon: formValues.bacon,
      pineapple: formValues.pineapple,
      garlic: formValues.garlic,
      mushrooms: formValues.mushrooms,
      peppers: formValues.peppers,
      cranberries: formValues.cranberries,
      instructions: formValues.instructions.trim(),
    };
    submitNewOrder(newOrder);
  };

  // Effects Hook:
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="container">
      <StyledHeader>
        <h1>Lambda Eats</h1>
        <nav className="site-nav">
          <NavLink
            exact
            to="/"
            activeStyle={{
              color: "white",
              backgroundColor: "#999",
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/help"
            activeStyle={{
              color: "white",
              backgroundColor: "#999",
            }}
          >
            Help
          </NavLink>
        </nav>
      </StyledHeader>

      <Route exact path="/" component={Home} />
      <Route path="/help" component={Help} />

      <Route path="/pizza">
        <Form
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
        />
      </Route>

      <Route path="/confirmation">
        <Confirmation order={orders[orders.length - 1]} />
      </Route>
    </div>
  );
};
export default App;
