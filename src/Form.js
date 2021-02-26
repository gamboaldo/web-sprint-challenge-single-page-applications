import React from "react";

export default function Form(props) {
  // Destructure props at argument placeholder
  const { values, change, submit, disabled, errors } = props;

  // Helper Functions:
  const onChange = (event) => {
    const { name, value, checked, type } = event.target;
    const valueToChange = type === "checkbox" ? checked : value;
    change(name, valueToChange);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  return (
    <div className="form-container">
      <h2>Build Your Own Pizza</h2>
      <div className="form-image">Image Placeholder</div>

      <form className="form-pizza" onSubmit={onSubmit}>
        <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.size}</div>
          <div>{errors.toppings}</div>
        </div>

        <div className="form-inputs">
          <div className="name-input">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={onChange}
              />
            </label>
          </div>

          <div className="size-choice">
            <h4>Choice of Size</h4>
            <p>Required</p>

            <label>
              Size:
              <select name="size" value={values.size} onChange={onChange}>
                <option value="">-- Select a Size--</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </label>
          </div>

          <div className="toppings-checkboxes">
            <h4>Add Toppings</h4>
            <p>Choose up to 4</p>

            <label>
              Pepperoni
              <input
                type="checkbox"
                name="pepperoni"
                checked={values.pepperoni}
                onChange={onChange}
              />
            </label>

            <label>
              Sausage
              <input
                type="checkbox"
                name="sausage"
                checked={values.sausage}
                onChange={onChange}
              />
            </label>

            <label>
              Bacon
              <input
                type="checkbox"
                name="bacon"
                checked={values.bacon}
                onChange={onChange}
              />
            </label>

            <label>
              Pineapple
              <input
                type="checkbox"
                name="pineapple"
                checked={values.pineapple}
                onChange={onChange}
              />
            </label>

            <label>
              Garlic
              <input
                type="checkbox"
                name="garlic"
                checked={values.garlic}
                onChange={onChange}
              />
            </label>

            <label>
              Mushrooms
              <input
                type="checkbox"
                name="mushrooms"
                checked={values.mushrooms}
                onChange={onChange}
              />
            </label>

            <label>
              Peppers
              <input
                type="checkbox"
                name="peppers"
                checked={values.peppers}
                onChange={onChange}
              />
            </label>

            <label>
              Cranberries
              <input
                type="checkbox"
                name="cranberries"
                checked={values.cranberries}
                onChange={onChange}
              />
            </label>
          </div>

          <div className="instructions-input">
            <h4>Special Instructions</h4>

            <input
              type="text"
              name="instructions"
              value={values.instructions}
              onChange={onChange}
              placeholder="Anything else you'd like to add?"
            />
          </div>

          {/* Button is disabled by default until form is complete */}
          <button disabled={disabled}>Add to Order</button>
        </div>
      </form>
    </div>
  );
}
