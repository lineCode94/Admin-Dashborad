import requests from "./httpService";

const ProductServices = {
  // getAllProducts({ page, limit, category, title, price }) {
  //   const searchCategory = category !== null ? category : '';
  //   const searchTitle = title !== null ? title : '';
  //   const searchPrice = price !== null ? price : '';

  //   return requests.get(
  //     `/products?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}&price=${searchPrice}`
  //   );
  // },
  getAllProducts(domain) {
    return requests.get(`/products?domain=${domain}`);
  },

  getStockOutProducts() {
    return requests.get("/products/stock-out");
  },

  getProductById(id, domain) {
    // console.log(requests.get(`/product/ProductID=${id}?domain=${domain}`));
    return requests.get(`/product/${id}?domain=${domain}`);
  },

  addProduct(body) {
    return requests.post("/products/add", body);
  },

  addAllProducts(body) {
    return requests.post("/products/all", body);
  },

  updateProduct(id, body) {
    return requests.put(`/products/${id}`, body);
  },

  updateStatus(id, domain) {
    return requests.post(`/product/toggle/publish/${id}`, { domain });
  },

  deleteProduct(id, domain) {
    return requests.delete(`/product/delete/${id}?domain=${domain}`);
  },
};

export default ProductServices;
