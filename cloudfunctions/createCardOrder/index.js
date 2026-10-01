const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { openid, cardId } = event;
  const cardResult = await db.collection('cards').doc(cardId).get();
  if (!cardResult.data) {
    return { success: false, msg: '卡片不存在' };
  }
  const card = cardResult.data;
  const order = {
    _openid: openid,
    cardId: card.id,
    cardName: card.name,
    cardType: card.type,
    amount: card.price,
    status: 'pending',
    createTime: db.serverDate()
  };
  const result = await db.collection('orders').add({ data: order });
  return { success: true, orderId: result._id, amount: card.price };
};
