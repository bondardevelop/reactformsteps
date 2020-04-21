import React from "react";
import Field from "../Field";
import countries from "../../data/countries";
import cities from "../../data/cities";

const Contacts = (props) => {
  const { errors, values, onChange } = props;

  const getOptionItems = (items) => {
    return items.map((item) => (
      <option id={item.id} key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  };

  const getOptionsCities = (cities) => {
    const fileredItems = Object.entries(cities).filter(
      (item) => item[1].country === Number(values.country)
    );

    return getOptionItems(
      fileredItems.map(([id, city]) => ({
        id: id,
        name: city.name,
      }))
    );
  };

  return (
    <div>
      <h3 className="text-center">Contacts</h3>
      <Field
        id="email"
        labelText="Email"
        type="text"
        placeholder="Email"
        name="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
      />
      <Field
        id="mobile"
        labelText="Mobile"
        type="text"
        placeholder="+380960000000"
        name="mobile"
        value={values.mobile}
        onChange={onChange}
        error={errors.mobile}
      />
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          className="form-control"
          id="country"
          name="country"
          value={values.country}
          onChange={(e) => {
            onChange(e);
            getOptionsCities(cities);
          }}
        >
          <option>Select Country</option>
          {getOptionItems(countries)}
        </select>
        {errors.country && (
          <div className="invalid-feedback">{errors.country}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <select
          className="form-control"
          id="city"
          name="city"
          value={values.city}
          onChange={onChange}
        >
          <option>Select City</option>
          {getOptionsCities(cities)}
        </select>
        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
      </div>
    </div>
  );
};

export default Contacts;
