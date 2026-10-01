const api = require('../../utils/api.js');

Page({
  data: {
    form: {
      contactName: '',
      contactPhone: '',
      adminName: '',
      adminPhone: '',
      parkingInfo: ''
    }
  },

  onLoad() {},

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [`form.${field}`]: e.detail.value
    });
  },

  async submit() {
    const { contactName, contactPhone, adminName, adminPhone, parkingInfo } = this.data.form;
    if (!contactPhone) {
      wx.showToast({ title: '请填写联系电话', icon: 'none' });
      return;
    }
    try {
      await api.submitPartnerApply(this.data.form);
      wx.showModal({
        title: '提交成功',
        content: '感谢您的申请，我们会在3个工作日内联系您。',
        showCancel: false,
        success: () => {
          wx.navigateBack();
        }
      });
    } catch (e) {
      wx.showToast({ title: '提交失败', icon: 'none' });
    }
  }
});