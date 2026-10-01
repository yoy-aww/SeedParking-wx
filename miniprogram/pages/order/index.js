const api = require('../../utils/api');

Page({
  data: {
    totalCount: 0,
    enteredCount: 0,
    tabs: [
      { id: 'all', name: '全部' },
      { id: 'pending', name: '待入场' },
      { id: 'entered', name: '已入场' },
      { id: 'completed', name: '已完成' },
      { id: 'canceling', name: '取消中' },
      { id: 'cancelled', name: '已取消' }
    ],
    activeTab: 'all',
    orders: [],
    loading: true,
    empty: false
  },
  onLoad() {
    this.loadOrders();
  },
  onShow() {
    this.loadOrders();
  },
  async loadOrders() {
    this.setData({ loading: true });
    try {
      const res = await api.getOrders({ tab: this.data.activeTab });
      this.setData({
        orders: res.list || [],
        totalCount: res.totalCount || 0,
        enteredCount: res.enteredCount || 0,
        empty: !res.list || res.list.length === 0
      });
    } catch (e) {
      console.error('加载订单失败', e);
      this.setData({ empty: true });
    } finally {
      this.setData({ loading: false });
    }
  },
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    this.loadOrders();
  },
  goToOrderDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/order/index` });
  },
  goToBooking(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/list/index` });
  }
});