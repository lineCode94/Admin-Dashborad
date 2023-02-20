import requests from "./httpService";
// const domain = state.adminInfo.data.domain;

const AddonsServices = {
  getAllAddons(domain) {
    return requests.get(`/addons?domain=${domain}&lang=en`);
  },

  addAddons(body) {
    return requests.post("/addons", body);
  },
  getAddonById(id, domain) {
    return requests.get(`/addons/${id}?domain=${domain}`);
  },
  deleteAddon(id) {
    return requests.delete(`/addons/${id}`);
  },

  updateAddon(id, body) {
    // console.log(body.title);
    return requests.patch(
      `/addons/${id}?&title=${body.title}&price=${body.price}`
    );
    //  return requests.post(`/addons/:${id}`, body);
  },
};

export default AddonsServices;
