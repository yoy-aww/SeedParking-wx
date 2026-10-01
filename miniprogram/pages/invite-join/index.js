const api = require('../../utils/api.js');

Page({
  data: {
    teamId: '',
    joining: false,
    history: []
  },

  onLoad() {
    this.loadHistory();
  },

  async loadHistory() {
    try {
      const res = await api.getTeamHistory();
      this.setData({ history: res.data });
    } catch (e) {
      console.error('加载历史失败', e);
    }
  },

  inputTeamId(e) {
    this.setData({ teamId: e.detail.value.trim() });
  },

  async joinTeam() {
    const teamId = this.data.teamId;
    if (!teamId) {
      wx.showToast({ title: '请输入队伍ID', icon: 'none' });
      return;
    }
    if (this.data.joining) return;
    this.setData({ joining: true });
    try {
      await api.joinTeam(teamId);
      wx.showToast({ title: '加入成功', icon: 'success' });
      this.loadHistory();
      setTimeout(() => wx.navigateBack(), 1000);
    } catch (e) {
      wx.showToast({ title: e.message || '加入失败', icon: 'none' });
    } finally {
      this.setData({ joining: false });
    }
  },

  back() {
    wx.navigateBack();
  }
});