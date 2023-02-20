import requests from "./httpService";

const CountryServices = {
  async getAllCountries() {
    return requests.get("locations/all");
  },
};

export default CountryServices;
