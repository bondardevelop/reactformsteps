import React from "react";
import Field from "./Field";

const Basic = props => {
  const {
    firstname,
    lastname,
    password,
    repeatPassword,
    gender
  } = props.values;
  const {
    firstnameError,
    lastnameError,
    passwordError,
    repeatPasswordError,
    genderError
  } = props.errors;
  const onChange = props.onChange;
  return (
    <div>
      <h3 className="text-center">Basic</h3>
      <Field
        id="firstname"
        labelText="First name"
        type="text"
        placeholder="First name"
        name="firstname"
        value={firstname}
        onChange={onChange}
        error={firstnameError}
      />
      <Field
        id="lastname"
        labelText="Last name"
        type="text"
        placeholder="Last name"
        name="lastname"
        value={lastname}
        onChange={onChange}
        error={lastnameError}
      />
      <Field
        id="password"
        labelText="Password"
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={onChange}
        error={passwordError}
      />
      <Field
        id="repeatPassword"
        labelText="Repeat password"
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={repeatPassword}
        onChange={onChange}
        error={repeatPasswordError}
      />
      <fieldset className="form-group">
        <div>Gender</div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
        {genderError ? (
          <div className="invalid-feedback">{genderError}</div>
        ) : null}
      </fieldset>
    </div>
  );
};

export default Basic;
