import React, { Component } from "react";

class SelectionStep extends Component {
  render() {
    return (
      <div
        className={`selection-step col-md-6 mb-5 text-center animated fadeIn${
          this.props.enabled ? " enabled" : ""
        }`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default SelectionStep;
