const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
const auth = require('../../utils/auth.js');

Page({
  data: {
    vehicles: [],
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
      this.loadVehicles();
    }
  },

  async loadVehicles() {
    try {
      const res = await api.getVehicles();
      this.setData({ vehicles: res.data || [] });
    } catch (e) {
      console.error('加载车辆失败', e);
    }
  },

  goToAdd() {
    wx.navigateTo({ url: '/pages/add-vehicle/index' });
  },

  goToEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/add-vehicle/index?id=${id}` });
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    const plate = e.currentTarget.dataset.plate;
    wx.showModal({
      title: '确认删除',
      content: `确定删除车牌 ${plate} 吗？`,
      confirmColor: '#FF4D4F',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.deleteVehicle(id);
            this.loadVehicles();
            wx.showToast({ title: '删除成功', icon: 'success' });
          } catch (err) {
            wx.showToast({ title: '删除失败', icon: 'none' });
          }
        }
      }
    });
  },

  setDefault(e) {
    const id = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['设为默认车辆'],
      success: async (res) => {
        if (res.tapIndex === 0) {
          try {
            await api.setDefaultVehicle(id);
            this.loadVehicles();
            wx.showToast({ title: '设置成功', icon: 'success' });
          } catch (err) {
            wx.showToast({ title: '设置失败', icon: 'none' });
          }
        }
      }
    });
  }
});