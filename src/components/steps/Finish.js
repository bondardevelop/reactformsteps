import React from "react";
import countries from "../../data/countries";
import cities from "../../data/cities";

const Finish = (props) => {
  const { values } = props;
  console.log(cities, cities[4]);
  const getCountry = countries.filter(
    (item) => item.id === Number(values.country)
  );

  return (
    <div>
      <div className="avatar-container avatar-user">
        <img alt="Avatar" title="Avatar" src={values.avatar} />
        <h3 className="mt-4 mb-4">
          {values.firstname} , {values.lastname}
        </h3>
      </div>
      <div>
        <div className="label">Email: </div> {values.email}
      </div>
      <div>
        <div className="label">Phone: </div> {values.mobile}
      </div>
      <div className="mb-4">
        <div className="label">Location: </div>
        {getCountry[0].name}, {cities[values.city].name}
      </div>
    </div>
  );
};

export default Finish;
