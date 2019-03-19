import $ from "jquery";

class OpenTableFinder {
  constructor() {
    this.city = null;
    this.restaurants = [];
  }

  findCities() {
    return new Promise((resolve, reject) => {
      !!this.request && this.request.abort();

      $.getJSON(`http://opentable.herokuapp.com/api/cities`)
        .done(result => {
          delete this.request;
          resolve(result);
        })
        .fail(xhr => {
          reject(xhr);
        });
    });
  }

  findRestaurantsBy(parameter, query, city) {
    return new Promise((resolve, reject) => {
      city = city ? `city=${city}&` : "";
      query = query ? `${parameter}=${query}&` : "";
      this.request = $.getJSON(
        `http://opentable.herokuapp.com/api/restaurants?${city}${query}`
      )
        .done(result => {
          delete this.request;
          resolve(result);
        })
        .fail(xhr => {
          reject(xhr);
        });
    });
  }

  findRestaurants(city, query) {
    city = city || "";
    query = query || "";

    return new Promise((resolve, reject) => {
      if (!city && !query) {
        resolve({ restaurants: [] });
        return;
      }

      let requests = [];

      if (query) {
        this.findRestaurantsBy("name", query, city).then(result => {
          resolve(result);
        });
        // requests.push(this.findRestaurantsBy("address", query, city));
        // requests.push(this.findRestaurantsBy("area", query, city));
      } else {
        this.findRestaurantsBy("city", city).then(result => {
          resolve(result);
        });
      }

      //   Promise.all(requests)
      //     .then(results => {
      //       debugger;
      //       let total_entries = Math.max(
      //         ...results.map(result => result.total_entries)
      //       );
      //       results = results.reduce((results, result) => {
      //         return results.concat(result.restaurants);
      //       }, []);

      //       results = {
      //         restaurants: [...new Set(results)],
      //         total_entries: total_entries
      //       };
      //       resolve(results);
      //     })
      //     .catch(e => {
      //       console.error(e);
      //     });
    });
  }
}

export default OpenTableFinder;
