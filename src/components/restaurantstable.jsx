import React, { Component } from "react";

class RestaurantsTable extends Component {
  render() {
    let x = this.props.values;
    return (
      <table className="table table-striped table-hover table-borderless">
        <caption>
          List of restaurants in
          {this.props.city ? (
            <span>
              <span className="ml-3 mr-1 text-muted">
                <i className="fas fa-city" />
              </span>{" "}
              "{this.props.city}"
            </span>
          ) : (
            <em> all cities</em>
          )}
        </caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Area</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {[...this.props.values]
            .sort((a, b) => {
              if (
                this.props.restaurant &&
                a.name === this.props.restaurant.name
              ) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
            .map(r => (
              <tr
                key={r.id}
                className={`animated fadeIn fast${
                  this.props.restaurant && this.props.restaurant.name === r.name
                    ? " text-white bg-primary"
                    : ""
                }`}
              >
                <td className="name">{r.name}</td>
                <td className="address">{r.address}</td>
                <td className="area">{r.area}</td>
                <td className="price">{r.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default RestaurantsTable;
