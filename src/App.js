import React, { Component } from "react";
import "./App.css";

import OpenTableFinder from "./class/opentablefinder";
import NavBar from "./components/navbar";
import SelectCity from "./components/selectcity";
import SelectRestaurant from "./components/selectrestaurant";
import SelectionStep from "./components/selectionstep";
import RestaurantsTable from "./components/restaurantstable";

class App extends Component {
  state = {
    city: null,
    restaurant: null,
    restaurants: [],
    openTableFinder: new OpenTableFinder()
  };

  updateRestaurants = city => {
    return new Promise((resolve, reject) => {
      this.state.openTableFinder
        .findRestaurants(city)
        .then(result => {
          !result.total_entries && this.setState({ restaurant: null });
          this.setState({ restaurants: result.restaurants });
          resolve();
        })
        .catch(e => {
          console.error(e);
        });
    });
  };

  handleCitySelect = city => {
    this.setState({ city });
    this.updateRestaurants(city);
  };

  handleRestaurantSelect = restaurant => {
    this.setState({ restaurant });
  };

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <NavBar />
          <div className="row m-4 animated fadeIn">
            <SelectionStep enabled={true}>
              <h4 className="mb-3">Select a city:</h4>
              <SelectCity
                openTableFinder={this.state.openTableFinder}
                onSelection={this.handleCitySelect}
              />
            </SelectionStep>

            <SelectionStep enabled={!!this.state.city}>
              <h4 className="mb-3">
                Pick a restaurant from {this.state.city}:
              </h4>
              <SelectRestaurant
                value={this.state.restaurant}
                city={this.state.city}
                empty={!!!this.restaurant}
                openTableFinder={this.state.openTableFinder}
                onSelection={this.handleRestaurantSelect}
              />
            </SelectionStep>
          </div>
          <div className="mt-4">
            <h5>City results</h5>
            <RestaurantsTable
              city={this.state.city}
              restaurant={this.state.restaurant}
              values={this.state.restaurants}
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
