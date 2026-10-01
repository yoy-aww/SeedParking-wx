const api = require('../../utils/api.js');

Page({
  data: {
    cards: [
      { id: 'card-10', name: '10次停车卡', uses: 10, price: 298, savings: '省约30%', active: true },
      { id: 'card-20', name: '20次停车卡', uses: 20, price: 558, savings: '省约35%', active: true },
      { id: 'card-50', name: '50次停车卡', uses: 50, price: 1288, savings: '省约40%', active: true }
    ],
    selectedCard: null
  },

  onLoad() {
    this.loadCards();
  },

  async loadCards() {
    try {
      const res = await api.getCards();
      if (res.data && res.data.length > 0) {
        this.setData({ cards: res.data });
      }
    } catch (e) {
      console.error('加载优惠卡失败', e);
    }
  },

  selectCard(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ selectedCard: id });
  },

  goToCheckout() {
    if (!this.data.selectedCard) {
      wx.showToast({ title: '请选择一张优惠卡', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: `/pages/card-checkout/index?cardId=${this.data.selectedCard}` });
  }
});