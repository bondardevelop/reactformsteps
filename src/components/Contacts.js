import React from "react";
import Field from "./Field";
import Countries from "../data/countries";
import Cities from "../data/cities";

const Contacts = props => {
  const { email, mobile, country, city } = props.values;
  const { emailError, mobileError, countryError, cityError } = props.errors;
  const onChange = props.onChange;
  const getOptionsCountries = props.getOptionsCountries;
  const getOptionsCities = props.getOptionsCities;
  return (
    <div>
      <h3 className="text-center">Contacts</h3>
      <Field
        id="email"
        labelText="Email"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
        error={emailError}
      />
      <Field
        id="mobile"
        labelText="Mobile"
        type="text"
        placeholder="+380960000000"
        name="mobile"
        value={mobile}
        onChange={onChange}
        error={mobileError}
      />
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          className="form-control"
          id="country"
          name="country"
          value={country}
          onChange={onChange}
        >
          {getOptionsCountries(Countries)}
        </select>
        {countryError ? (
          <div className="invalid-feedback">{countryError}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <select
          className="form-control"
          id="city"
          name="city"
          value={city}
          onChange={onChange}
        >
          <option>Select City</option>
          {getOptionsCities(Cities, Countries)}
        </select>
        {cityError ? <div className="invalid-feedback">{cityError}</div> : null}
      </div>
    </div>
  );
};

export default Contacts;
