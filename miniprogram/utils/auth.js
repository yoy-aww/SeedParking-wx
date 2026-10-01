// utils/auth.js - 认证工具（本地mock，无需真实后端）
function isLoggedIn() {
  return !!wx.getStorageSync('token');
}

function isLogin() {
  return isLoggedIn();
}

function getToken() {
  return wx.getStorageSync('token');
}

function setToken(token) {
  wx.setStorageSync('token', token);
}

function clearToken() {
  wx.removeStorageSync('token');
}

function getUserInfo() {
  return wx.getStorageSync('userInfo') || { nickName: '游客', phone: '', avatarUrl: '' };
}

function setUserInfo(info) {
  wx.setStorageSync('userInfo', info);
}

function clearUserInfo() {
  wx.removeStorageSync('userInfo');
}

function logout() {
  clearToken();
  clearUserInfo();
}

function getUserStats() {
  return {
    orderCount: 4,
    vehicleCount: 2,
    couponCount: 3,
    cardCount: 0
  };
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isLogin: isLogin,
  getToken: getToken,
  setToken: setToken,
  clearToken: clearToken,
  getUserInfo: getUserInfo,
  setUserInfo: setUserInfo,
  clearUserInfo: clearUserInfo,
  logout: logout,
  getUserStats: getUserStats
};