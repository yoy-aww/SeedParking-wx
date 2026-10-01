const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const collections = ['users', 'vehicles', 'orders', 'coupons', 'cards', 'teams', 'partner-applications'];
  const created = [];
  for (let i = 0; i < collections.length; i++) {
    const colName = collections[i];
    try {
      await db.createCollection(colName);
      created.push(colName);
    } catch (e) {
    }
  }
  const cards = [
    {
      id: 'card_10_times',
      name: '10次停车卡',
      type: 'times',
      usableCount: 10,
      giftCount: 15,
      giftCouponAmount: 5,
      price: 88,
      tag: '推荐',
      perks: ['每次省10元', '赠15张5元券', '不限停车场']
    },
    {
      id: 'card_30_times',
      name: '30次停车卡',
      type: 'times',
      usableCount: 30,
      giftCount: 40,
      giftCouponAmount: 5,
      price: 228,
      tag: '超值',
      perks: ['每次省12元', '赠40张5元券', '不限停车场']
    },
    {
      id: 'card_monthly',
      name: '月卡',
      type: 'monthly',
      usableCount: 999,
      giftCount: 20,
      giftCouponAmount: 5,
      price: 199,
      tag: '月享',
      perks: ['30天内不限次', '赠20张5元券', '指定停车场']
    }
  ];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    try {
      await db.collection('cards').doc(card.id).set({ data: card });
    } catch (e) {
      try {
        await db.collection('cards').add({ data: card });
      } catch (e2) {
      }
    }
  }
  return { success: true, created, cardsInserted: cards.length };
};
