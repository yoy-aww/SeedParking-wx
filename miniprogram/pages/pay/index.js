const api = require('../../utils/api.js');

Page({
  data: {
    order: null,
    amount: 0,
    paymentMethod: 'wechat',
    paying: false,
    payResult: null
  },

  onLoad(options) {
    const orderId = options.orderId;
    if (orderId) {
      this.loadOrder(orderId);
    }
  },

  async loadOrder(orderId) {
    try {
      const res = await api.getOrderById(orderId);
      this.setData({
        order: res.data,
        amount: res.data.amount
      });
    } catch (e) {
      wx.showToast({ title: '加载订单失败', icon: 'none' });
    }
  },

  choosePayment(e) {
    this.setData({ paymentMethod: e.currentTarget.dataset.type });
  },

  async doPay() {
    if (this.data.paying) return;
    if (!this.data.order) {
      wx.showToast({ title: '订单信息加载中', icon: 'none' });
      return;
    }
    this.setData({ paying: true });
    try {
      const res = await api.getPayParams(this.data.order.id);
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success: () => this.onPaySuccess(),
        fail: (err) => {
          if (err.errMsg.includes('cancel')) {
            wx.showToast({ title: '支付已取消', icon: 'none' });
          } else {
            this.onPayFail(err);
          }
        }
      });
    } catch (e) {
      this.onPayFail(e);
    }
  },

  async onPaySuccess() {
    try {
      await api.updateOrderStatus(this.data.order.id, 'paid');
      this.setData({ payResult: 'success' });
      wx.showModal({
        title: '支付成功',
        content: '支付完成，感谢您的使用！',
        showCancel: false,
        success: () => {
          wx.navigateBack({ delta: 2 });
        }
      });
    } catch (e) {
      wx.showToast({ title: '支付处理中', icon: 'none' });
    }
  },

  onPayFail(err) {
    this.setData({ paying: false, payResult: 'fail' });
    wx.showToast({ title: '支付失败，请重试', icon: 'none' });
  }
});