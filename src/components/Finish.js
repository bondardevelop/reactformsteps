import React from "react";
import countries from "../data/countries";
import cities from "../data/cities";

const Finish = (props) => {
  const { values } = props;

  const getCountry = countries.filter(
    (item) => item.id === Number(values.country)
  );

  const getCities = (cities) => {
    const fileredItems = Object.entries(cities).filter(
      (item) => item[1].country === Number(values.country)
    );
    return fileredItems.map(([id, city]) => ({
      id: id,
      name: city.name,
    }));
  };

  const getCitie = getCities(cities).filter(
    (item) => Number(item.id) === Number(values.city)
  );

  return (
    <div>
      <div className="avatar-container">
        <img alt="Avatar" title="Avatar" src={values.avatar} />
        <h3 className="mt-4 mb-4">
          {values.firstname} , {values.lastname}
        </h3>
      </div>
      <div>Email: {values.email}</div>
      <div>Phone: {values.mobile}</div>
      <div className="mb-4">
        {getCountry[0].name}, {getCitie[0].name}
      </div>
    </div>
  );
};

export default Finish;
