const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const openid = event.openid;
  const userResult = await db.collection('users').where({ openid }).get();
  const userName = userResult.data.length > 0 ? (userResult.data[0].nickName || openid) : openid;
  const team = {
    _openid: openid,
    captainId: openid,
    captainName: userName,
    members: [openid],
    memberCount: 1,
    maxCount: 4,
    status: 'open',
    createTime: db.serverDate(),
    rewardClaimed: false
  };
  const result = await db.collection('teams').add({ data: team });
  return { success: true, teamId: result._id };
};
