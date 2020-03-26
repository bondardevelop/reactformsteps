import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultAvatar from "../img/default-avatar.png";
import Field from "./Field";
import Countries from "../data/countries";
import Cities from "../data/cities";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: "basic",
      formNumber: 1,
      firstname: "",
      lastname: "",
      password: "",
      repeatPassword: "",
      gender: "",
      email: "",
      mobile: "",
      country: Countries[0].name,
      countryId: 0,
      city: "",
      avatar: defaultAvatar,
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

  validate = () => {
    const errors = {};
    console.log(this.state.country);
    if (this.state.formNumber === 1) {
      if (this.state.firstname.length < 5) {
        errors.firstname = "Must be 5 characters or more";
      }
      if (this.state.lastname.length < 5) {
        errors.lastname = "Must be 5 characters or more";
      }
      if (this.state.password.length < 6) {
        errors.password = "Must be 6 characters or more";
      }
      if (this.state.password !== this.state.repeatPassword) {
        errors.repeatPassword = "Must be equal password";
      }
      if (this.state.gender.length < 1) {
        errors.gender = "Required";
      }
    }
    if (this.state.formNumber === 2) {
      if (this.state.email.length < 5) {
        errors.email = "Invalid email address";
      }
      if (this.state.mobile.length < 5) {
        errors.mobile = "Invalid mobile";
      }
      if (this.state.country.length < 1) {
        errors.country = "Required";
      }
      if (this.state.city.length < 1) {
        errors.city = "Required";
      }
    }
    if (this.state.formNumber === 3) {
      if (this.state.avatar.length < 1) {
        errors.avatar = "Required";
      }
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: {
          validate: true
        },
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
      if (item.name === this.state.country) {
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

  // buttonPaginationNext = () => {
  //   console.log(this.state.formNumber);
  //   this.validate();
  //   if (this.state.errors.validate) {
  //     this.setState({
  //       formNumber:
  //         this.state.formNumber !== 4 ? this.state.formNumber + 1 : null
  //     });
  //   } else {
  //     this.validate();
  //   }
  // };

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
    const thisName = e.target.name;
    const thisValue = e.target.value;
    this.setState(
      (prevState, prevProps) => ({
        [thisName]: thisValue
      }),
      () => {
        console.log("this onChange");
      }
    );
  };

  onChangeAvatar = e => {
    const reader = new FileReader();
    reader.onload = e => {
      console.log("result", e.target, e.target.result);

      this.setState({
        avatar: e.target.result
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    console.log(this.state);
    return (
      <div className="form-container card">
        <div className="card-body">
          <div className="row">
            <ul className="list-group list-group-horizontal ml-auto mr-auto">
              <li
                className="list-group-item"
                onClick={() => {
                  this.buttonPagination(1);
                }}
              >
                1
              </li>
              <li
                className="list-group-item"
                onClick={() => {
                  this.buttonPagination(2);
                }}
              >
                2
              </li>
              <li
                className="list-group-item"
                onClick={() => {
                  this.buttonPagination(3);
                }}
              >
                3
              </li>
              <li
                className="list-group-item"
                onClick={() => {
                  this.buttonPagination(4);
                }}
              >
                4
              </li>
            </ul>
          </div>
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
                  value={this.state.firstname}
                  onChange={this.onChange}
                  error={this.state.errors.firstname}
                />
                <Field
                  id="lastname"
                  labelText="Last name"
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={this.state.errors.lastname}
                />
                <Field
                  id="password"
                  labelText="Password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={this.state.errors.password}
                />
                <Field
                  id="repeatPassword"
                  labelText="Repeat password"
                  type="repeatPassword"
                  placeholder="Repeat password"
                  name="repeatPassword"
                  value={this.state.repeatPassword}
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
                      checked={this.state.gender === "male"}
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
                      checked={this.state.gender === "female"}
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
                  value={this.state.email}
                  onChange={this.onChange}
                  error={this.state.errors.email}
                />
                <Field
                  id="mobile"
                  labelText="Mobile"
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={this.state.mobile}
                  onChange={this.onChange}
                  error={this.state.errors.mobile}
                />
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    className="form-control"
                    id="country"
                    name="country"
                    value={this.state.country}
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
                    value={this.state.city}
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
                  <img alt="Avatar" title="Avatar" src={this.state.avatar} />
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
                <div>{this.state.email}</div>
                <div>{this.state.mobile}</div>
                <div>
                  {this.state.country}, {this.state.city}
                </div>
              </div>
            ) : null}
          </form>
          <div className="row">
            {this.state.formNumber !== 1 ? (
              <button
                className="btn btn-light mr-4"
                onClick={this.buttonPaginationPrev}
              >
                Prev
              </button>
            ) : null}
            {this.state.formNumber !== 4 ? (
              <button className="btn btn-light" onClick={this.validate}>
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
