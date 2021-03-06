import decode from "jwt-decode";
import axios from "axios";

export default class AuthService {
  constructor(domain) {
    // this.baseurl = "http://localhost:5000";
    this.baseurl = "http://104.248.233.14:5000";
    this.domain = domain || this.baseurl + "/v1/auth/login"; // API server domain
    this.forgotpw = this.baseurl + "/v1/auth/forgot";
    this.resetpw = this.baseurl + "/v1/auth/change-password";
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  async login(email, password) {
    // Get a token from api server using the fetch api
    let payload = {
      email: email,
      password: password
    };

    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      let response = await axios.post(this.domain, payload, config);
      console.log(response.data.token);
      this.setToken(response.data.token);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  }

  async forgotPassword(email) {
    let payload = {
      email: email
    };
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      let response = await axios.post(this.forgotpw, payload, config);
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  }

  async resetPassword(email, resetToken, password) {
    let payload = {
      email: email,
      resetToken: resetToken,
      password: password
    };
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      let response = await axios.post(this.resetpw, payload, config);
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
