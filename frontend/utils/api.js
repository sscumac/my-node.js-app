export default {
  getProducts(uri) {
    return fetch(`http://localhost:8000/${uri}`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  },
};
