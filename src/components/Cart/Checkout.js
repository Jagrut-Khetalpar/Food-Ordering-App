import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: enteredName,
    hasError: nameHasError,
    valueIsValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    hasError: streetHasError,
    valueIsValid: streetIsValid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    hasError: cityHasError,
    valueIsValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    hasError: postalHasError,
    valueIsValid: postalIsValid,
    inputBlurHandler: postalBlurHandler,
    valueChangeHandler: postalChangeHandler,
    reset: resetPostalCode,
  } = useInput(isFiveChars);

  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity);
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;
  const streetClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;
  const postalClasses = `${classes.control} ${
    postalHasError ? classes.invalid : ""
  }`;
  const cityClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
