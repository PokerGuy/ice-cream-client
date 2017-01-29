var APIRoot = "http://api.zoe-doodle.com/";
//var APIRoot = "http://localhost:3002";
module.exports = {
  APIEndpoints: {
    FLAVORS: APIRoot + "/v1/flavors",
    NONCE: APIRoot + "/v1/nonce",
    ORDER: APIRoot + "/v1/order",
    DONATION: APIRoot + "/v1/donation",
    LOGIN: APIRoot + "/v1/auth/sign_in",
    ADMIN_FLAVORS: APIRoot + "/v1/flavors_admin",
    FLAVORS_ALL: APIRoot + "/v1/flavors_all",
    BLOG: APIRoot + "/v1/blog"
  },
  Listener: {Root: "http://api.zoe-doodle.com:9000"}
  //Listener: {Root: "http://localhost:9000"}
  //GA_TRACKING_CODE: 'UA-UA-66105505-1'
};
