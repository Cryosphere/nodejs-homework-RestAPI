const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const updateAvatar = require("./updateAvatar");
const resendingEmail = require("./resendingEmail");
const verifyEmail = require("./verifyEmail");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  resendingEmail,
  verifyEmail,
  updateSubscriptionUser,
  updateAvatar,
};
