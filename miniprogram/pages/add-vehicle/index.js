const api = require('../../utils/api.js');

Page({
  data: {
    plate: '',
    province: '',
    isDefault: false,
    canSubmit: false
  },

  onLoad(options) {
    if (options.id) {
      this.editId = options.id;
    }
  },

  selectProvince(e) {
    const province = e.detail.value;
    this.setData({ province: province + '·' });
    this.checkSubmit();
  },

  onPlateChange(e) {
    this.setData({ plate: e.detail.value });
    this.checkSubmit();
  },

  toggleDefault() {
    this.setData({ isDefault: !this.data.isDefault });
  },

  checkSubmit() {
    const plate = this.data.province.replace('·', '') + this.data.plate;
    this.setData({ canSubmit: plate.length >= 7 });
  },

  async submit() {
    if (!this.data.canSubmit) {
      wx.showToast({ title: '请填写完整车牌信息', icon: 'none' });
      return;
    }
    try {
      const fullPlate = this.data.province.replace('·', '') + this.data.plate;
      const data = {
        plate: this.data.plate,
        province: this.data.province.replace('·', ''),
        isDefault: this.data.isDefault
      };
      if (this.editId) {
        await api.updateVehicle(this.editId, data);
        wx.showToast({ title: '修改成功', icon: 'success' });
      } else {
        await api.addVehicle(data);
        wx.showToast({ title: '添加成功', icon: 'success' });
      }
      setTimeout(() => wx.navigateBack(), 1000);
    } catch (e) {
      wx.showToast({ title: '操作失败', icon: 'none' });
    }
  }
});