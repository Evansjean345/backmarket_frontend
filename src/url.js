/*local*/
const baseUrl = "https://backmarket-backend.onrender.com";

/*production*/
// const baseUrl = "https://backend-back-market-9b83fb45c29d.herokuapp.com";

//user
const registerUserUrl = `${baseUrl}/api/users/registerUser`;
const loginUserUrl = `${baseUrl}/api/users/loginUser`;
const deleteUserUrl = `${baseUrl}/api/users/deleteUser`;
const updateUserUrl = `${baseUrl}/api/users/updateUser`;
const getUserUrl = `${baseUrl}/api/users/getUser`;
const getAllUsersUrl = `${baseUrl}/api/users/getAllUsers`;

//articles
const getArticleUrl = `${baseUrl}/api/articles/getArticle`;
const getAllArticlesUrl = `${baseUrl}/api/articles/getAllArticles`;
const getAllArticlesByShopIdUrl = `${baseUrl}/api/articles/getAllArticlesByShopId`;
const createArticleUrl = `${baseUrl}/api/articles/createArticle`;
const updateArticleUrl = `${baseUrl}/api/articles/updateArticle`;
const deleteArticleUrl = `${baseUrl}/api/articles/deleteArticle`;
const deleteArticleByShopUrl = `${baseUrl}/api/articles/deleteArticleByShop`;

//order
const createOrderUrl = `${baseUrl}/api/orders/createOrder`;
const getOrderUrl = `${baseUrl}/api/orders/getOrder`;
const getAllOrdersUrl = `${baseUrl}/api/orders/getAllOrders`;
const getOrdersByShopUrl = `${baseUrl}/api/orders/getOrdersByShop`;
const updateStatusOrderUrl = `${baseUrl}/api/orders/updateOrder/status`;
const deleteOrderUrl = `${baseUrl}/api/orders/deleteOrder`;

//shop
const createShopUrl = `${baseUrl}/api/shops/createShop`;
const getShopUrl = `${baseUrl}/api/shops/getShop`;
const getAllShopsUrl = `${baseUrl}/api/shops/getAllShops`;
const updateShopUrl = `${baseUrl}/api/shops/updateShop`;
const deleteShopUrl = `${baseUrl}/api/shops/deleteShop`;

//categories
const getAllCategoriesUrl = `${baseUrl}/api/categories/getAllCategories`;
const addCategoryUrl = `${baseUrl}/api/categories/addCategory`;
const addSubCategoryUrl = `${baseUrl}/api/categories/addSubCategory`;
const addMultipleCategoriesUrl = `${baseUrl}/api/categories/addMultipleCategories`;

export {
  registerUserUrl,
  loginUserUrl,
  deleteUserUrl,
  updateUserUrl,
  getUserUrl,
  getAllUsersUrl,
  createOrderUrl,
  getOrderUrl,
  getAllOrdersUrl,
  getOrdersByShopUrl,
  updateStatusOrderUrl,
  deleteOrderUrl,
  createArticleUrl,
  updateArticleUrl,
  deleteArticleUrl,
  deleteArticleByShopUrl,
  getArticleUrl,
  getAllArticlesUrl,
  getAllArticlesByShopIdUrl,
  createShopUrl,
  getShopUrl,
  getAllShopsUrl,
  updateShopUrl,
  deleteShopUrl,
  getAllCategoriesUrl,
  addCategoryUrl,
  addSubCategoryUrl,
  addMultipleCategoriesUrl,
};
