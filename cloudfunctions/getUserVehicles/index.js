const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const openid = event.openid;
  const result = await db.collection('vehicles').where({ _openid: openid }).orderBy('createTime', 'desc').get();
  return { vehicles: result.data };
};
