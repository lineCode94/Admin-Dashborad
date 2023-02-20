import requests from "./httpService";

const CityServices = {
  getAllCities({ govId }) {
    const governorate_id = govId;
    return requests.get(`locations/${governorate_id}/city`);
  },
};

export default CityServices;
