const api = require('../../utils/api.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    team: null,
    history: [],
    isLogin: false
  },

  onLoad() {
    this.checkLogin();
  },

  onShow() {
    this.checkLogin();
  },

  checkLogin() {
    const isLogin = auth.isLoggedIn();
    this.setData({ isLogin });
    if (isLogin) {
      this.loadTeam();
      this.loadHistory();
    }
  },

  async loadTeam() {
    try {
      const res = await api.getMyTeam();
      this.setData({ team: res.data });
    } catch (e) {
      console.error('加载队伍失败', e);
    }
  },

  async loadHistory() {
    try {
      const res = await api.getTeamHistory();
      this.setData({ history: res.data });
    } catch (e) {
      console.error('加载历史失败', e);
    }
  },

  goToCreate() {
    wx.navigateTo({ url: '/pages/invite-create/index' });
  },

  goToJoin() {
    wx.navigateTo({ url: '/pages/invite-join/index' });
  }
});