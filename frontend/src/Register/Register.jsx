import React, { Component } from "react";
import "../Login/Login.css";
import AuthService from "../AuthService/AuthService";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      reenterPass: "",
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.Auth = new AuthService();
  }

  render() {
    let submit;
    let errorMessage;

    if (
      (this.state.password.length < 6 ||
        this.state.reenterPass.length < 6 ||
        this.state.password.length > 20 ||
        this.state.reenterPass.length > 20) &&
      (this.state.password.length > 0 || this.state.reenterPass.length > 0) &&
      !(this.state.password.length >= 6 && this.state.password.length <= 20) &&
      !(
        this.state.reenterPass.length >= 6 &&
        this.state.reenterPass.length <= 20
      )
    ) {
      errorMessage = (
        <div>
          <input className="button" type="submit" value="Register" disabled />
          <p style={{ color: "red", fontSize: "15px" }}>
            Password must be between 6-20 characters
          </p>
        </div>
      );
    } else if (this.state.password !== this.state.reenterPass) {
      errorMessage = (
        <div>
          <input className="button" type="submit" value="Register" disabled />
          <p style={{ color: "red", fontSize: "15px" }}>
            Passwords do not match
          </p>
        </div>
      );
    }
    // } else if (this.state.hasError) {
    //   errorMessage = (
    //     <div>
    //       <input className="button" type="submit" value="Register" disabled />
    //       <p style={{ color: "red", fontSize: "15px" }}>
    //         Error in registration. Try again.
    //       </p>
    //     </div>
    //   );
    // }
    else {
      submit = <input className="button" type="submit" value="Register" />;
    }
    // if (this.state.hasError) {
    //   errorMessage = (
    //     <p style={{ color: "red", fontSize: "15px" }}>
    //       Error in registration. Try again.
    //     </p>
    //   );
    // }
    return (
      <div>
        <h3> Register </h3>
        <form onSubmit={e => this.submit(e)}>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              size="25"
              required
              onChange={e => this.handleChange(e)}
            />
            <br />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              size="25"
              required
              onChange={e => this.handleChange(e)}
            />
            <br />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="reenterPass"
              placeholder="Re-enter Password"
              size="25"
              required
              onChange={e => this.handleChange(e)}
            />
            <br />
          </div>
          {submit}
          {errorMessage}
          <br />
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async submit(e) {
    e.preventDefault();

    // let url = "http://localhost:5000/v1/auth/register";
    let url = "http://104.248.233.14:5000/v1/auth/register";

    let payload = {
      email: this.state.email,
      password: this.state.password
    };

    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      let result = await axios.post(url, payload, config);
      console.log(result.data);
      if (result.data.success) alert("Successful reg");
    } catch (err) {
      console.log(err.response);
      if (err.response.data.message === "Email is already in use!") {
        alert("Email already in use");
      }
      this.setState({ hasError: true });
    }
  }
}
export default Register;
