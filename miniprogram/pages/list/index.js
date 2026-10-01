const api = require('../../utils/api');

Page({
  data: {
    category: '',
    tabs: [
      { id: 'airport', name: '机场' },
      { id: 'railway', name: '高铁' },
      { id: 'hospital', name: '医院' },
      { id: 'mall', name: '商场' }
    ],
    activeTab: 'all',
    filters: {
      sort: 'distance',
      priceRange: '',
      brand: ''
    },
    lots: [],
    loading: true,
    empty: false
  },
  onLoad(options) {
    if (options.category) {
      this.setData({ category: options.category, activeTab: options.category });
    }
    this.loadLots();
  },
  async loadLots() {
    this.setData({ loading: true });
    try {
      const res = await api.getParkingLots({
        category: this.data.category,
        tab: this.data.activeTab,
        ...this.data.filters
      });
      this.setData({ lots: res.list || [], empty: !res.list || res.list.length === 0 });
    } catch (e) {
      console.error('加载列表失败', e);
      this.setData({ empty: true });
    } finally {
      this.setData({ loading: false });
    }
  },
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    this.loadLots();
  },
  applyFilter(e) {
    const { type, value } = e.currentTarget.dataset;
    this.setData({ [`filters.${type}`]: value });
    this.loadLots();
  },
  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/list/index?category=airport` });
  },
  goToBooking(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/list/index` });
  }
});