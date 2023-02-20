import requests from "./httpService";

const SubCategoryServices = {
  getAllCategory({ payload }) {
    return requests.get(
      `/categories?domain=${payload.domain}&lang=en&sub_category=1`
    );
  },

  getSubCategoryById({ payload }) {
    const { id, domain } = payload;
    return requests.get(
      `/category/${id}/sub-categories?domain=${domain}&lang=en`
    );
  },

  addCategory(body) {
    return requests.post("/category/add", body);
  },

  updateCategory(id, body) {
    return requests.put(`/category/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory(id, body) {
    return requests.patch(`/category/${id}`, body);
  },
};

export default SubCategoryServices;
