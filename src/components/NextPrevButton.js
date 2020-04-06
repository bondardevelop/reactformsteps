import React from "react";
const classNames = require("classnames");

const NextPrevButton = (props) => {
  const { currentForm, nextPage, buttonPaginationPrev } = props;
  const Button = classNames({
    btn: true,
    "btn btn-primary": true,
  });

  const resetForm = () => {
    document.location.reload(true);
  };

  return (
    <div className="container">
      <div className="row">
        <button
          disabled={currentForm === 1 ? true : false}
          className={`mr-4 ${Button}`}
          onClick={buttonPaginationPrev}
        >
          Prev
        </button>
        {currentForm !== 4 ? (
          <button className={Button} onClick={nextPage}>
            Next
          </button>
        ) : (
          <button className={Button} onClick={resetForm}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default NextPrevButton;
