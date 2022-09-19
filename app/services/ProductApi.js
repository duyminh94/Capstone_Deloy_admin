function apiGetProduct(searchTerm) {
  return axios({
    url: "https://62f50948535c0c50e768499f.mockapi.io/apiProducts",
    method: "GET",
    params: {
      type: searchTerm,
    },
  });
}

function apiAddProduct(product) {
  return axios({
    url: "https://62f50948535c0c50e768499f.mockapi.io/apiProducts",
    method: "POST",
    data: product,
  });
}

function apideteleProduct(productId) {
  return axios({
    url: `https://62f50948535c0c50e768499f.mockapi.io/apiProducts/${productId}`,
    method: "DELETE",
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://62f50948535c0c50e768499f.mockapi.io/apiProducts/${productId}`,
    method: "GET",
  });
}

function apiUpdateProduct(productId, product) {
  return axios({
    url: `https://62f50948535c0c50e768499f.mockapi.io/apiProducts/${productId}`,
    method: "PUT",
    data: product,
  });
}
