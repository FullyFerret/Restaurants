import React, { Component } from "react";
import SelectCity from "./selectcity";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <button className="btn btn-link navbar-brand">Restaurants</button>
        {/* <form className="form-inline my-2 my-lg-0">
          <SelectCity />
        </form> */}
      </nav>
    );
  }
}

export default NavBar;
