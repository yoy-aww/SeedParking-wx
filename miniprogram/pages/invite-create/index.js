const api = require('../../utils/api.js');

Page({
  data: {
    teamId: '',
    members: [],
    totalMembers: 3,
    currentMembers: 1,
    rewardInfo: { amount: 100, count: 3 }
  },

  onLoad() {
    this.createTeam();
  },

  async createTeam() {
    try {
      const res = await api.createTeam();
      this.setData({
        teamId: res.data.teamId,
        members: res.data.members
      });
    } catch (e) {
      wx.showToast({ title: '创建失败', icon: 'none' });
    }
  },

  copyTeamId() {
    wx.setClipboardData({
      data: this.data.teamId,
      success: () => {
        wx.showToast({ title: '已复制队伍ID', icon: 'success' });
      }
    });
  },

  inviteFriend() {
    wx.showToast({ title: '请分享小程序给好友', icon: 'none' });
  },

  disbandTeam() {
    wx.showModal({
      title: '确认解散',
      content: '确定要解散这个队伍吗？',
      confirmColor: '#FF4D4F',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.disbandTeam(this.data.teamId);
            wx.showToast({ title: '已解散', icon: 'success' });
            setTimeout(() => wx.navigateBack(), 1000);
          } catch (e) {
            wx.showToast({ title: '解散失败', icon: 'none' });
          }
        }
      }
    });
  },

  goToHistory() {
    wx.navigateBack();
  }
});