import React from "react";
import Field from "../Field";

const Basic = (props) => {
  const { values, errors, onChange } = props;

  return (
    <div>
      <h3 className="text-center">Basic</h3>
      <Field
        id="firstname"
        labelText="First name"
        type="text"
        placeholder="First name"
        name="firstname"
        value={values.firstname}
        onChange={onChange}
        error={errors.firstname}
      />
      <Field
        id="lastname"
        labelText="Last name"
        type="text"
        placeholder="Last name"
        name="lastname"
        value={values.lastname}
        onChange={onChange}
        error={errors.lastname}
      />
      <Field
        id="password"
        labelText="Password"
        type="password"
        placeholder="Password"
        name="password"
        value={values.password}
        onChange={onChange}
        error={errors.password}
      />
      <Field
        id="repeatPassword"
        labelText="Repeat password"
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        value={values.repeatPassword}
        onChange={onChange}
        error={errors.repeatPassword}
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
            checked={values.gender === "male"}
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
            checked={values.gender === "female"}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
        {errors.gender && (
          <div className="invalid-feedback">{errors.gender}</div>
        )}
      </fieldset>
    </div>
  );
};

export default Basic;
