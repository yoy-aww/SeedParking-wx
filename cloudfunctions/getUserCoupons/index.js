const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const openid = event.openid;
  const tab = event.tab || 'available';
  const now = new Date();
  let query = { _openid: openid };
  if (tab === 'available') {
    query.status = 'available';
  } else if (tab === 'used') {
    query.status = 'used';
  } else if (tab === 'expired') {
    query.status = 'expired';
  }
  const result = await db.collection('coupons').where(query).orderBy('expireDate', 'desc').get();
  return { coupons: result.data };
};
