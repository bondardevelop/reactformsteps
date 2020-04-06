import React from "react";

const Finish = (props) => {
  const {
    firstname,
    lastname,
    email,
    mobile,
    country,
    city,
    avatar,
  } = props.values;
  return (
    <div>
      <div className="avatar-container">
        <img alt="Avatar" title="Avatar" src={avatar} />
        <h3 className="mt-4 mb-4">
          {firstname} , {lastname}
        </h3>
      </div>
      <div>Email: {email}</div>
      <div>Phone: {mobile}</div>
      <div className="mb-4">
        {country}, {city}
      </div>
    </div>
  );
};

export default Finish;
