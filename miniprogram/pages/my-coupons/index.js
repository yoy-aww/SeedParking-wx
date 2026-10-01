const api = require('../../utils/api.js');

Page({
  data: {
    tabs: [
      { id: 'active', name: '待使用', count: 0 },
      { id: 'expired', name: '已过期', count: 0 },
      { id: 'used', name: '已使用', count: 0 }
    ],
    coupons: [],
    activeTab: 'active'
  },

  onLoad() {
    this.loadCoupons();
  },

  onShow() {
    this.loadCoupons();
  },

  async loadCoupons() {
    try {
      const res = await api.getCoupons();
      const active = res.data.filter(c => c.status === 'active');
      const expired = res.data.filter(c => c.status === 'expired');
      const used = res.data.filter(c => c.status === 'used');
      this.setData({
        coupons: res.data,
        'tabs[0].count': active.length,
        'tabs[1].count': expired.length,
        'tabs[2].count': used.length
      });
      this.filterCoupons();
    } catch (e) {
      console.error('加载优惠券失败', e);
    }
  },

  filterCoupons() {
    let filtered;
    switch (this.data.activeTab) {
      case 'active':
        filtered = this.data.coupons.filter(c => c.status === 'active');
        break;
      case 'expired':
        filtered = this.data.coupons.filter(c => c.status === 'expired');
        break;
      case 'used':
        filtered = this.data.coupons.filter(c => c.status === 'used');
        break;
    }
    this.setData({ coupons: filtered });
  },

  switchTab(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ activeTab: id });
    this.filterCoupons();
  },

  goToUse(e) {
    const couponId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/home/index?couponId=${couponId}` });
  }
});