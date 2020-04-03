import React from "react";

const Finish = props => {
  const {
    firstname,
    lastname,
    email,
    mobile,
    country,
    city,
    avatar
  } = props.values;
  return (
    <div>
      <div className="avatar-container">
        <img alt="Avatar" title="Avatar" src={avatar} />
        <h3>
          {firstname} , {lastname}
        </h3>
      </div>
      <div>{email}</div>
      <div>{mobile}</div>
      <div>
        {country}, {city}
      </div>
    </div>
  );
};

export default Finish;
