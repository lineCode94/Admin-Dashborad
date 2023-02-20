import requests from "./httpService";

const GovernorateServices = {
  getAllGovernorates({ countryId }) {
    const country_id = countryId;
    return requests.get(`locations/${country_id}/governorate`);
  },
};

export default GovernorateServices;
