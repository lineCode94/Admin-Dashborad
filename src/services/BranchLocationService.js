import requests from "./httpService";
const domain = localStorage.getItem("subDomain");
const BranchLocation = {
  getAllLocation() {
    return requests.get(`branches?domain=${domain}`);
  },
  getBranchLocationById({ id, domain }) {
    return requests.get(`branches/${id}?domain=${domain}`);
  },
  createBranch(body) {
    body.domain = domain;
    body.phone = String(body.phone);
    return requests.post("branches", body);
  },
  deleteBranchLocation({ id, domain }) {
    return requests.delete(`branches/${id}?domain=${domain}`);
  },
  createShippingFee(body) {
    return requests.post("branches/shipping", body);
  },
};
export default BranchLocation;
