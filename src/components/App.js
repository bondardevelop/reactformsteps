import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultAvatar from "../img/default-avatar.png";
import Field from "./Field";
import Stepspagination from "./Stepspagination";
import NextPrevButton from "./NextPrevButton";
import Countries from "../data/countries";
import Cities from "../data/cities";

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
        firstname: false,
        lastname: false,
        password: false,
        repeatPassword: false,
        gender: false,
        email: false,
        mobile: false,
        country: false,
        city: false,
        avatar: false
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
          errors.firstname = "The name can't contains numbers";
        }
        if (this.state.values.firstname.length < 5) {
          errors.firstname = "Must be 5 characters or more";
        }
        if (testLasttName) {
          errors.lastname = "The name can't contains numbers";
        }
        if (this.state.values.lastname.length < 5) {
          errors.lastname = "Must be 5 characters or more";
        }
        if (this.state.values.password.length < 6) {
          errors.password = "Must be 6 characters or more";
        }
        if (this.state.values.password !== this.state.values.repeatPassword) {
          errors.repeatPassword = "Must be equal password";
        }
        if (this.state.values.gender.length < 1) {
          errors.gender = "Required";
        }
        break;
      case 2:
        if (!testEmail) {
          errors.email = "Invalid email address";
        }
        if (!testMobile) {
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
    console.log(this.state.formNumber);
    this.setState({
      formNumber: this.state.formNumber !== 1 ? this.state.formNumber - 1 : null
    });
  };

  buttonPagination = current => {
    this.setState({
      formNumber: current
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value
      }
    });
  };

  onChangeAvatar = e => {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({
        avatar: e.target.result
      });
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
              <div>
                <h3 className="text-center">Basic</h3>
                <Field
                  id="firstname"
                  labelText="First name"
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  value={this.state.values.firstname}
                  onChange={this.onChange}
                  error={this.state.errors.firstname}
                />
                <Field
                  id="lastname"
                  labelText="Last name"
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  value={this.state.values.lastname}
                  onChange={this.onChange}
                  error={this.state.errors.lastname}
                />
                <Field
                  id="password"
                  labelText="Password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.values.password}
                  onChange={this.onChange}
                  error={this.state.errors.password}
                />
                <Field
                  id="repeatPassword"
                  labelText="Repeat password"
                  type="password"
                  placeholder="Repeat password"
                  name="repeatPassword"
                  value={this.state.values.repeatPassword}
                  onChange={this.onChange}
                  error={this.state.errors.repeatPassword}
                />
                <fieldset className="form-group">
                  <div>Gender</div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={this.state.values.gender === "male"}
                      onChange={this.onChange}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={this.state.values.gender === "female"}
                      onChange={this.onChange}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                  {this.state.errors.gender ? (
                    <div className="invalid-feedback">
                      {this.state.errors.gender}
                    </div>
                  ) : null}
                </fieldset>
              </div>
            ) : this.state.formNumber === 2 ? (
              <div>
                <h3 className="text-center">Contacts</h3>
                <Field
                  id="email"
                  labelText="Email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={this.state.values.email}
                  onChange={this.onChange}
                  error={this.state.errors.email}
                />
                <Field
                  id="mobile"
                  labelText="Mobile"
                  type="text"
                  placeholder="+380960000000"
                  name="mobile"
                  value={this.state.values.mobile}
                  onChange={this.onChange}
                  error={this.state.errors.mobile}
                />
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    className="form-control"
                    id="country"
                    name="country"
                    value={this.state.values.country}
                    onChange={this.onChange}
                  >
                    {this.getOptionsCountries(Countries)}
                  </select>
                  {this.state.errors.country ? (
                    <div className="invalid-feedback">
                      {this.state.errors.country}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select
                    className="form-control"
                    id="city"
                    name="city"
                    value={this.state.values.city}
                    onChange={this.onChange}
                  >
                    <option>Select City</option>
                    {this.getOptionsCities(Cities, Countries)}
                  </select>
                  {this.state.errors.city ? (
                    <div className="invalid-feedback">
                      {this.state.errors.city}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : this.state.formNumber === 3 ? (
              <div>
                <h3 className="text-center">Avatar</h3>
                <div className="avatar-container">
                  <img
                    alt="Avatar"
                    title="Avatar"
                    src={this.state.values.avatar}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control-file"
                    id="avatar"
                    name="avatar"
                    onChange={this.onChangeAvatar}
                  />
                  {this.state.errors.avatar ? (
                    <div className="invalid-feedback">
                      {this.state.errors.avatar}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : this.state.formNumber === 4 ? (
              <div>
                <div className="avatar-container">
                  <img alt="Avatar" title="Avatar" src={this.state.avatar} />
                  <h3>
                    {this.state.firstname} , {this.state.lastname}
                  </h3>
                </div>
                <div>{this.state.values.email}</div>
                <div>{this.state.values.mobile}</div>
                <div>
                  {this.state.values.country}, {this.state.values.city}
                </div>
              </div>
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
