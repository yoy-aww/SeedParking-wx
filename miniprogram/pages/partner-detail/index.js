const api = require('../../utils/api.js');

Page({
  data: {
    form: {
      distanceKm: '',
      distanceMin: '',
      facility: '',
      remark: ''
    },
    parkingId: ''
  },

  onLoad(options) {
    if (options.parkingId) {
      this.setData({ parkingId: options.parkingId });
    }
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [`form.${field}`]: e.detail.value
    });
  },

  async submit() {
    const { distanceKm, distanceMin } = this.data.form;
    if (!distanceKm && !distanceMin) {
      wx.showToast({ title: '请填写距离目的地信息', icon: 'none' });
      return;
    }
    try {
      const res = await api.submitParkingDetail({
        parkingId: this.data.parkingId,
        ...this.data.form
      });
      wx.showModal({
        title: '提交成功',
        content: '感谢您的申请，我们会尽快审核。',
        showCancel: false,
        success: () => {
          wx.navigateBack({ delta: 2 });
        }
      });
    } catch (e) {
      wx.showToast({ title: '提交失败', icon: 'none' });
    }
  }
});