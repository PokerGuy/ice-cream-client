var APIRoot = "http://zoedoodle-prod.elasticbeanstalk.com/";
//var APIRoot = "http://localhost:3002";
module.exports = {
  APIEndpoints: {
    FLAVORS: APIRoot + "/v1/flavors",
    NONCE: APIRoot + "/v1/nonce",
    ORDER: APIRoot + "/v1/order",
    DONATION: APIRoot + "/v1/donation",
    LOGIN: APIRoot + "/v1/auth/sign_in",
    ADMIN_FLAVORS: APIRoot + "/v1/flavors_admin",
    BLOG: APIRoot + "/v1/blog"
  },
  Listener: {Root: "http://zoedoodle-prod.elasticbeanstalk.com:9000"}
//  Listener: {Root: "http://localhost:9000"}
};
