const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { openid, id } = event;
  await db.collection('vehicles').where({ _id: id, _openid: openid }).remove();
  return { success: true };
};
