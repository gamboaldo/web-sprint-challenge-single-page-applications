import React from "react";

export default function Confirmation({ order }) {
  if (!order) {
    return <h3>Processing your order...</h3>;
  }

  const toppings = Object.entries(order).filter((pair) => pair[1] === true);

  return (
    <div className="order-confirmation">
      <h3>Thank you for your order!</h3>
      <h4>Order Details:</h4>
      <ul>
        <li>Name: {order.name}</li>
        <li>Size: {order.size}</li>
        {toppings.map((topping) => {
          return <li>{topping[0][0].toUpperCase() + topping[0].substr(1)}</li>;
        })}
        {order.instructions ? (
          <li>Instructions: {order.instructions}</li>
        ) : (
          <li>No special instructions</li>
        )}
      </ul>
    </div>
  );
}
