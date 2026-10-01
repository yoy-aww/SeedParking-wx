const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { openid, parkingId, plate, startTime, endTime, couponId } = event;
  const order = {
    _openid: openid,
    parkingId,
    plate,
    startTime,
    endTime,
    amount: 0,
    status: 'pending',
    couponId: couponId || null,
    createTime: db.serverDate()
  };
  const result = await db.collection('orders').add({ data: order });
  return { success: true, orderId: result._id };
};
