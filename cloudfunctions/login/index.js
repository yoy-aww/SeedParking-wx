const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  let isLogin = false;
  const userCol = db.collection('users');
  const result = await userCol.where({ openid }).get();
  if (result.data.length === 0) {
    await userCol.add({
      data: { openid, createTime: db.serverDate() }
    });
  } else {
    isLogin = true;
  }
  return { openid, isLogin };
};
