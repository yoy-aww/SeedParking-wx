const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    city: '北京',
    categories: [
      { id: 'airport', name: '机场', icon: '✈', color: '#1E7EF0' },
      { id: 'railway', name: '高铁', icon: '🚄', color: '#07C160' },
      { id: 'hospital', name: '医院', icon: '🏥', color: '#FF4444' },
      { id: 'mall', name: '商场', icon: '🛍', color: '#FF8C00' },
      { id: 'office', name: '办公', icon: '🏢', color: '#9B59B6' }
    ],
    banners: [
      { id: 1, title: '新用户专享礼包', subtitle: '首单立减10元', bgColor: '#1E7EF0', color: '#fff' },
      { id: 2, title: '机场停车低至6折', subtitle: '热门航线优选车位', bgColor: '#FF8C00', color: '#fff' },
      { id: 3, title: '高铁站无忧停', subtitle: '提前预约更省心', bgColor: '#07C160', color: '#fff' }
    ],
    recommendations: [],
    loading: true,
    currentPage: 1,
    hasMore: true
  },
  onLoad() {
    this.loadData();
  },
  onShow() {
    this.refresh();
  },
  onPullDownRefresh() {
    this.refresh();
  },
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMore();
    }
  },
  async loadData() {
    try {
      const res = await api.getRecommendations();
      this.setData({ recommendations: res.list || [], hasMore: res.hasMore || false });
    } catch (e) {
      console.error('加载推荐失败', e);
    } finally {
      this.setData({ loading: false });
      wx.stopPullDownRefresh();
    }
  },
  async loadMore() {
    this.setData({ loading: true });
    try {
      const res = await api.getRecommendations({ page: this.data.currentPage + 1 });
      this.setData({
        recommendations: [...this.data.recommendations, ...(res.list || [])],
        currentPage: this.data.currentPage + 1,
        hasMore: res.hasMore || false
      });
    } catch (e) {
      console.error('加载更多失败', e);
    } finally {
      this.setData({ loading: false });
    }
  },
  async refresh() {
    this.setData({ loading: true, currentPage: 1 });
    await this.loadData();
    this.setData({ recommendations: [] });
    await this.loadMore();
  },
  switchCity() {
    wx.navigateTo({ url: '/pages/list/index' });
  },
  goToCategory(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/list/index?category=${id}` });
  },
  goToList(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/list/index?category=airport` });
  },
  goToMy() {
    wx.switchTab({ url: '/pages/my/index' });
  },
  goToLogin() {
    wx.navigateTo({ url: '/pages/login/index' });
  }
});