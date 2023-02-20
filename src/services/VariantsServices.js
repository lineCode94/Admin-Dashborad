import requests from "./httpService";
import { encodeQueryData } from "./httpService";
const domain = localStorage.getItem("subDomain");
const VariantsServices = {
  getAllVariants(domain) {
    return requests.get(`/variations?domain=${domain}&lang=en`);
  },

  addVariants(body) {
    console.log("variant", body);
    return requests.post("/variations", body);
  },
  getVariantsById(id) {
    console.log("id , domain", id, domain);
    return requests.get(`/variations/${id}?domain=${domain}`);
  },
  deleteVariant(id) {
    return requests.delete(`/variations/${id}`);
  },

  updateVariants(id, body) {
    console.log("params", encodeQueryData(body));
    // console.log(body.title);
    return requests.patch(`/variations/${id}?&title=${body.title}`, body);
    //  return requests.post(`/variants/:${id}`, body);
  },
};

export default VariantsServices;
