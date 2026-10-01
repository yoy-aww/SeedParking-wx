const auth = require('../../utils/auth');

Page({
  data: {
    isLogin: false,
    userInfo: {},
    vehicleCount: 0,
    couponCount: 0,
    cards: [],
    activities: []
  },
  onLoad() {
    this.checkLogin();
  },
  onShow() {
    this.checkLogin();
  },
  checkLogin() {
    const isLogin = auth.isLogin();
    if (isLogin) {
      this.setData({ isLogin: true });
      this.loadUserStats();
    } else {
      this.setData({ isLogin: false });
    }
  },
  async loadUserStats() {
    try {
      const stats = await auth.getUserStats();
      this.setData({
        userInfo: stats.user || {},
        vehicleCount: stats.vehicleCount || 0,
        couponCount: stats.couponCount || 0
      });
    } catch (e) {
      console.error('加载用户数据失败', e);
    }
  },
  goToLogin() {
    wx.navigateTo({ url: '/pages/login/index' });
  },
  goToVehicles() {
    if (!this.checkAuth()) return;
    wx.navigateTo({ url: '/pages/my-vehicles/index' });
  },
  goToCoupons() {
    if (!this.checkAuth()) return;
    wx.navigateTo({ url: '/pages/my-coupons/index' });
  },
  goToCards() {
    if (!this.checkAuth()) return;
    wx.navigateTo({ url: '/pages/my-cards/index' });
  },
  goToPartner() {
    wx.navigateTo({ url: '/pages/partner-apply/index' });
  },
  goToFaq() {
    wx.navigateTo({ url: '/pages/faq/index' });
  },
  goToInvite() {
    if (!this.checkAuth()) return;
    wx.navigateTo({ url: '/pages/invite/index' });
  },
  goToPrivacy() {
    wx.navigateTo({ url: '/pages/privacy-policy/index' });
  },
  goToActivityRules() {
    wx.navigateTo({ url: '/pages/activity-rules/index' });
  },
  goToCustomerService() {
    wx.makePhoneCall({ phoneNumber: '400-000-0000' });
  },
  checkAuth() {
    if (!auth.isLogin()) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      this.goToLogin();
      return false;
    }
    return true;
  }
});