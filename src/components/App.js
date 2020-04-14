import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultAvatar from "../img/default-avatar.png";
import Basic from "./Basic";
import Contacts from "./Contacts";
import Avatar from "./Avatar";
import Finish from "./Finish";
import Stepsnavigation from "./Stepsnavigation";
import NextPrevButton from "./NextPrevButton";
import countries from "../data/countries";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentForm: 1,
      values: {
        firstname: "",
        lastname: "",
        password: "",
        repeatPassword: "",
        gender: "",
        email: "",
        mobile: "",
        country: countries[0].id,
        city: 1,
        avatar: defaultAvatar,
      },
      errors: {},
    };
  }

  getErrors = () => {
    const errors = {};

    switch (this.state.currentForm) {
      case 1:
        const TestFirstName = /[0-9]/g.test(this.state.values.firstname);
        if (TestFirstName) {
          errors.firstname = "The name can't contains numbers";
        }
        if (this.state.values.firstname.length < 5) {
          errors.firstname = "Must be 5 characters or more";
        }
        const TestLasttName = /[0-9]/g.test(this.state.values.lastname);
        if (TestLasttName) {
          errors.lastname = "The name can't contains numbers";
        }
        if (this.state.values.lastname.length < 5) {
          errors.lastname = "Must be 5 characters or more";
        }
        if (this.state.values.password.length < 6) {
          errors.password = "Must be 6 characters or more";
        }
        if (this.state.values.password !== this.state.values.repeatPassword) {
          errors.repeatPasswor = "Must be equal password";
        }
        if (this.state.values.gender.length < 1) {
          errors.gender = "Required";
        }
        break;
      case 2:
        const TestEmail = this.state.values.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
        );
        if (!TestEmail) {
          errors.email = "Invalid email address";
        }
        const TestMobile = this.state.values.mobile.match(
          /^\+?3?8?(0[5-9][0-9]\d{7})$/
        );
        if (!TestMobile) {
          errors.mobile = "Invalid mobile";
        }
        if (this.state.values.country.length < 1) {
          errors.country = "Required";
        }
        if (this.state.values.city.length < 1) {
          errors.city = "Required";
        }
        break;
      case 3:
        if (this.state.values.avatar.length < 1) {
          errors.avatar = "Required";
        }
        break;
      default:
    }

    return errors;
  };

  prevStep = () => {
    this.setState((state) => ({
      currentForm: state.currentForm - 1,
    }));
  };

  nextStep = () => {
    const errors = this.getErrors();
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors,
      });
    } else {
      this.setState((state) => ({
        errors: {},
        currentForm: state.currentForm + 1,
      }));
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => ({
      values: {
        ...state.values,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <div className="form-container card">
        <div className="card-body">
          <Stepsnavigation currentForm={this.state.currentForm} />
          <form className="form">
            {this.state.currentForm === 1 ? (
              <Basic
                values={this.state.values}
                errors={this.state.errors}
                onChange={this.onChange}
              />
            ) : null}
            {this.state.currentForm === 2 ? (
              <Contacts
                values={this.state.values}
                errors={this.state.errors}
                onChange={this.onChange}
              />
            ) : null}
            {this.state.currentForm === 3 ? (
              <Avatar onChange={this.onChange} state={this.state} />
            ) : null}
            {this.state.currentForm === 4 ? (
              <Finish values={this.state.values} />
            ) : null}
          </form>
          <NextPrevButton
            currentForm={this.state.currentForm}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
        </div>
      </div>
    );
  }
}
