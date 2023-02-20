import requests from "./httpService";

const CategoryServices = {
  getAllCategory(domain) {
    return requests.get(`/categories?domain=${domain}&lang=en&sub_category=1`);
  },

  getCategoryById(id, domain) {
    return requests.get(`/categories/${id}?domain=${domain}`);
  },

  addCategory(body) {
    return requests.post("/categories", body);
  },

  updateCategory(id, body) {
    console.log(`/categories/update/${id}`, body);

    return requests.post(`/categories/update/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.post(`/categories/update/${id}`, body);
  },

  deleteCategory(id) {
    return requests.delete(`/categories/${id}`);
  },
  togglePublish(id, domain) {
    return requests.post(`/categories/toggle-publish/${id}`, { domain });
  },

  getSubCategoriesForCategory(id, domain) {
    return requests.get(`categories/${id}/sub-categories?domain=${domain}`);
  },
};

export default CategoryServices;
