import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultAvatar from "../img/default-avatar.png";
import Basic from "./Basic";
import Contacts from "./Contacts";
import Avatar from "./Avatar";
import Finish from "./Finish";
import Stepspagination from "./Stepspagination";
import NextPrevButton from "./NextPrevButton";
import Countries from "../data/countries";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formNumber: 1,
      values: {
        firstname: "",
        lastname: "",
        password: "",
        repeatPassword: "",
        gender: "",
        email: "",
        mobile: "",
        country: Countries[0].name,
        city: "",
        avatar: defaultAvatar
      },
      errors: {
        firstnameError: false,
        lastnameError: false,
        passwordError: false,
        repeatPasswordError: false,
        genderError: false,
        emailError: false,
        mobileError: false,
        countryError: false,
        cityError: false,
        avatarError: false
      }
    };
  }

  getErrors = () => {
    const errors = {};
    //REg exp
    const regExpOnlyCharacters = /[0-9]/g;
    const regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    const regExpMobile = /^\+?3?8?(0[5-9][0-9]\d{7})$/;
    const testFirstName = regExpOnlyCharacters.test(
      this.state.values.firstname
    );
    const testLasttName = regExpOnlyCharacters.test(this.state.values.lastname);
    const testEmail = this.state.values.email.match(regExpEmail);
    const testMobile = this.state.values.mobile.match(regExpMobile);

    switch (this.state.formNumber) {
      case 1:
        if (testFirstName) {
          errors.firstnameError = "The name can't contains numbers";
        }
        if (this.state.values.firstname.length < 5) {
          errors.firstnameError = "Must be 5 characters or more";
        }
        if (testLasttName) {
          errors.lastnameError = "The name can't contains numbers";
        }
        if (this.state.values.lastname.length < 5) {
          errors.lastnameError = "Must be 5 characters or more";
        }
        if (this.state.values.password.length < 6) {
          errors.passwordError = "Must be 6 characters or more";
        }
        if (this.state.values.password !== this.state.values.repeatPassword) {
          errors.repeatPasswordError = "Must be equal password";
        }
        if (this.state.values.gender.length < 1) {
          errors.genderError = "Required";
        }
        break;
      case 2:
        if (!testEmail) {
          errors.emailError = "Invalid email address";
        }
        if (!testMobile) {
          errors.mobileError = "Invalid mobile";
        }
        if (this.state.values.country.length < 1) {
          errors.countryError = "Required";
        }
        if (this.state.values.city.length < 1) {
          errors.cityError = "Required";
        }
        break;
      case 3:
        if (this.state.values.avatar.length < 1) {
          errors.avatarError = "Required";
        }
        break;
    }

    return errors;
  };

  nextPage = () => {
    const errors = this.getErrors();
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        formNumber:
          this.state.formNumber !== 4 ? this.state.formNumber + 1 : null
      });
    }
  };

  getOptionsCountries = countries => {
    return countries.map(item => (
      <option id={item.id} key={item.id} value={item.name}>
        {item.name}
      </option>
    ));
  };

  getOptionsCities = (cities, countries) => {
    const citiesArr = [];
    let country;
    let countryId;

    const currentCountry = countries.filter(item => {
      if (item.name === this.state.values.country) {
        return item;
      }
    });

    country = currentCountry[0];
    if (country !== undefined) {
      countryId = country.id;
    }

    for (let key in cities) {
      citiesArr.push(cities[key]);
    }

    return citiesArr.map((item, index) => {
      if (item.country === countryId) {
        return (
          <option id={index} key={index} value={item.name}>
            {item.name}
          </option>
        );
      }
    });
  };

  buttonPaginationPrev = () => {
    this.setState({
      formNumber: this.state.formNumber !== 1 ? this.state.formNumber - 1 : null
    });
  };

  buttonPagination = current => {
    this.setState({
      formNumber: current
    });
  };

  onChangee = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      }
    }));
  };

  onChangeAvatar = e => {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState(state => ({
        values: {
          ...state.values,
          avatar: e.target.result
        }
      }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    return (
      <div className="form-container card">
        <div className="card-body">
          <Stepspagination currentForm={this.state.formNumber} />

          <form className="form">
            {this.state.formNumber === 1 ? (
              <Basic
                values={this.state.values}
                errors={this.state.errors}
                onChange={this.onChangee}
              />
            ) : this.state.formNumber === 2 ? (
              <Contacts
                values={this.state.values}
                errors={this.state.errors}
                onChange={this.onChangee}
                getOptionsCountries={this.getOptionsCountries}
                getOptionsCities={this.getOptionsCities}
              />
            ) : this.state.formNumber === 3 ? (
              <Avatar
                values={this.state.values}
                errors={this.state.errors}
                onChangeAvatar={this.onChangeAvatar}
              />
            ) : this.state.formNumber === 4 ? (
              <Finish values={this.state.values} />
            ) : null}
          </form>
          <NextPrevButton
            currentForm={this.state.formNumber}
            nextPage={this.nextPage}
            buttonPaginationPrev={this.buttonPaginationPrev}
          />
        </div>
      </div>
    );
  }
}
