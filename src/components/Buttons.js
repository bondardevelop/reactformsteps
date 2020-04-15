import React from "react";

const Buttons = (props) => {
  const { currentForm, nextStep, prevStep, resetForm } = props;

  return (
    <div className="container">
      <div className="row">
        <button
          disabled={currentForm === 1}
          className="btn mr-4 btn-primary"
          onClick={prevStep}
        >
          Prev
        </button>
        {currentForm !== 4 ? (
          <button className="btn btn-primary" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button className="btn btn-primary" onClick={resetForm}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Buttons;
