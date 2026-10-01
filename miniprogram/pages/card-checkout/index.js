const api = require('../../utils/api.js');

Page({
  data: {
    card: null,
    total: 0,
    orderInfo: {
      productName: '',
      cardType: '',
      availableUses: 0,
      activationType: '自动开通',
      orderType: '优惠卡'
    },
    selectedPayment: 'wechat'
  },

  onLoad(options) {
    const cardId = options.cardId;
    this.loadCard(cardId);
  },

  async loadCard(cardId) {
    try {
      const res = await api.getCardById(cardId);
      const card = res.data;
      this.setData({
        card,
        total: card.price,
        'orderInfo.productName': card.name,
        'orderInfo.cardType': card.name,
        'orderInfo.availableUses': card.uses
      });
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  selectPayment(e) {
    this.setData({ selectedPayment: e.currentTarget.dataset.type });
  },

  async submitOrder() {
    try {
      const res = await api.createCardOrder(this.data.card.id);
      wx.navigateTo({ url: `/pages/pay/index?orderId=${res.data.orderId}` });
    } catch (e) {
      wx.showToast({ title: '创建订单失败', icon: 'none' });
    }
  }
});