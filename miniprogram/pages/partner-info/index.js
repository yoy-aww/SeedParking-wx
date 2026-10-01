const api = require('../../utils/api.js');

Page({
  data: {
    form: {
      name: '',
      address: '',
      capacity: '',
      wholesalePrice: '',
      businessHours: '',
      destType: '',
      destTransfer: ''
    },
    destTypes: ['机场', '火车站', '地铁站', '商场', '医院', '学校', '其他'],
    destTransferOptions: ['无接送', '有接送']
  },

  onLoad() {},

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [`form.${field}`]: e.detail.value
    });
  },

  selectType(e) {
    const index = e.detail.value;
    this.setData({
      'form.destType': this.data.destTypes[index]
    });
  },

  selectTime(e) {
    this.setData({
      'form.businessHours': e.detail.value
    });
  },

  selectTransfer(e) {
    const index = e.detail.value;
    this.setData({
      'form.destTransfer': this.data.destTransferOptions[index]
    });
  },

  async submit() {
    const { name, address, capacity } = this.data.form;
    if (!name || !address) {
      wx.showToast({ title: '请填写停车场名称和地址', icon: 'none' });
      return;
    }
    try {
      const res = await api.submitParkingInfo(this.data.form);
      wx.showToast({ title: '提交成功', icon: 'success' });
      setTimeout(() => {
        wx.navigateTo({ url: `/pages/partner-detail/index?parkingId=${res.data.id}` });
      }, 1000);
    } catch (e) {
      wx.showToast({ title: '提交失败', icon: 'none' });
    }
  }
});