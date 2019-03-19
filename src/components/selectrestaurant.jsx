import React, { Component } from "react";
import { ReactSelectize, SimpleSelect } from "react-selectize";

const minimumQueryLength = 1;

class SelectRestaurant extends Component {
  static get minimumQueryLength() {
    return minimumQueryLength;
  }

  state = {
    search: []
  };

  search = value => {
    this.setState({ search: value });

    if (value.length > SelectRestaurant.minimumQueryLength) {
      this.props.openTableFinder
        .findRestaurants(this.props.city, value)
        .then(result => {
          this.setState({ libraries: result.restaurants.slice(0, 20) }, () => {
            this.refs.select.highlightFirstSelectableOption();
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  renderOption = item => {
    return (
      <div key={item.id} className="simple-option p-2" style={{ fontSize: 12 }}>
        <div className="result-image mr-2">
          {item.image_url ? (
            <img src={item.image_url} alt="" />
          ) : (
            <span className="text-muted">
              <i className="fas fa-utensils" />
            </span>
          )}
        </div>
        <div className="result-description">
          <div className="text-truncate font-weight-bold">{item.name}</div>
          <div className="text-truncate">{item.city}</div>
        </div>
      </div>
    );
  };

  renderValue = item => {
    return (
      <div
        key={item.id}
        className="simple-value text-truncate font-weight-normal"
      >
        <span className="text-muted mr-2">
          <i className="fas fa-utensils" />
        </span>
        <span>{item.name}</span>
      </div>
    );
  };

  renderEmptyResults = (value, search) => {
    return (
      <div className="no-results-found" style={{ fontSize: 13 }}>
        {typeof this.req == "undefined" && this.state.search.length == 0
          ? "type a few characters"
          : "No results found"}
      </div>
    );
  };

  render() {
    return (
      <SimpleSelect
        className="mx-auto"
        placeholder="Select a restaurant"
        ref="select"
        sort-by="name"
        value={this.props.value}
        options={this.state.libraries}
        search={this.state.search}
        onValueChange={value => this.props.onSelection(value)}
        onSearchChange={value => this.search(value)}
        filterOptions={(options, search) => options}
        uid={item => item.id}
        renderOption={item => this.renderOption(item)}
        renderValue={item => this.renderValue(item)}
        renderNoResultsFound={(value, search) =>
          this.renderEmptyResults(value, search)
        }
      />
    );
  }
}

export default SelectRestaurant;
