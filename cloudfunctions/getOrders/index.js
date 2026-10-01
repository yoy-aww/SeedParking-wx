const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID;
  const tab = event.tab || 'all';
  const orderCol = db.collection('orders');
  let query = { _openid: openid };
  if (tab === 'pending') {
    query.status = 'pending';
  } else if (tab === 'entered') {
    query.status = 'entered';
  } else if (tab === 'done') {
    query.status = 'done';
  } else if (tab === 'cancelling') {
    query.status = 'cancelling';
  } else if (tab === 'cancelled') {
    query.status = 'cancelled';
  }
  const result = await orderCol.where(query).orderBy('createTime', 'desc').limit(50).get();
  const totalResult = await orderCol.where({ _openid: openid }).count();
  const enteredResult = await orderCol.where({ _openid: openid, status: 'entered' }).count();
  return { orders: result.data, totalCount: totalResult.total, enteredCount: enteredResult.total };
};
