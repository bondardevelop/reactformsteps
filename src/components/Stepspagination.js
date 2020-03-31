import React from "react";
const classNames = require("classnames");

const Stepspagination = props => {
  const { currentForm } = props;
  const formNumbers = [1, 2, 3, 4];

  return (
    <div className="container mb-4">
      <div className="row">
        <ul className="list-group list-group-horizontal ml-auto mr-auto">
          {formNumbers.map((value, index) => {
            const listItemClass = classNames({
              "list-item": true,
              "list-item-active": value == currentForm,
              "list-item-notactive": value < currentForm
            });
            return (
              <li key={index} className={listItemClass}>
                {value >= currentForm ? value : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Stepspagination;
