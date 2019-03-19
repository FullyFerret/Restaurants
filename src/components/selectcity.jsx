import React, { Component } from "react";
import OpenTableFinder from "../class/opentablefinder";
import { ReactSelectize, SimpleSelect } from "react-selectize";
import Reduct from "redux";

const minimumQueryLength = 1;

class SelectCity extends Component {
  static get minimumQueryLength() {
    return minimumQueryLength;
  }

  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize = () => {
    this.props.openTableFinder
      .findCities()
      .then(result => {
        this.setState({
          options: result.cities.map(city => {
            return { label: city, value: city };
          })
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  state = {
    search: [],
    options: []
  };

  search = value => {
    this.setState({ search: value });

    if (value.length > SelectCity.minimumQueryLength) {
      if (!!this.req) this.req.abort();

      value = value.toLowerCase();

      this.setState(
        {
          libraries: this.state.options
            .filter(o => o.value.toLowerCase().includes(value))
            .slice(0, 20)
        },
        () => {
          this.refs.select.highlightFirstSelectableOption();
        }
      );
    }
  };

  renderOption = item => {
    return (
      <div className="simple-option p-2" style={{ fontSize: 12 }}>
        <div className="text-truncate font-weight-bold">{item.label}</div>
      </div>
    );
  };

  renderValue = item => {
    return (
      <div className="simple-value text-truncate font-weight-normal">
        <span className="text-muted mr-2">
          <i className="fas fa-city" />
        </span>
        <span>{item.label}</span>
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
        placeholder="Select a city"
        ref="select"
        options={this.state.libraries}
        search={this.state.search}
        onValueChange={value => this.props.onSelection(value && value.value)}
        onSearchChange={value => this.search(value)}
        filterOptions={(options, search) => options}
        uid={item => item}
        renderOption={item => this.renderOption(item)}
        renderValue={item => this.renderValue(item)}
        renderNoResultsFound={(value, search) =>
          this.renderEmptyResults(value, search)
        }
      />
    );
  }
}

export default SelectCity;
