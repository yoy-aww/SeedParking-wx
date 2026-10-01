const config = require('./config')

App({
  globalData: {
    userInfo: null,
    isLogin: false,
    openid: '',
    city: '北京',
    vehicles: [],
    coupons: [],
    orders: []
  },
  onLaunch: function() {
    wx.cloud.init({
      env: config.envId,
      traceUser: true
    })
    var openid = wx.getStorageSync('openid')
    if (openid) {
      this.globalData.openid = openid
      this.globalData.isLogin = true
    }
  },
  onShow: function() {
    if (this.globalData.isLogin) {
      var openid = wx.getStorageSync('openid')
      if (openid) {
        this.globalData.openid = openid
      }
    }
  },
  util: {
    login: function() {
      return new Promise(function(resolve, reject) {
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: function(res) {
            var app = getApp()
            app.globalData.openid = res.result.openid
            app.globalData.isLogin = true
            wx.setStorageSync('openid', res.result.openid)
            resolve(res.result)
          },
          fail: function(err) {
            reject(err)
          }
        })
      })
    }
  }
})
