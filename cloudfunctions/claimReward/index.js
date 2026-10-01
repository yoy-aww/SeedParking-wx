const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { openid, teamId } = event;
  const teamResult = await db.collection('teams').doc(teamId).get();
  const team = teamResult.data;
  if (!team) {
    return { success: false, msg: '队伍不存在' };
  }
  if (team.captainId !== openid) {
    return { success: false, msg: '只有队长可领取奖励' };
  }
  if (team.rewardClaimed) {
    return { success: false, msg: '奖励已领取' };
  }
  await db.collection('teams').doc(teamId).update({
    data: { rewardClaimed: true }
  });
  const now = new Date();
  const expireDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  await db.collection('coupons').add({
    data: {
      _openid: openid,
      amount: 5,
      condition: '满20可用',
      type: 'cash',
      scope: 'all',
      expireDate,
      status: 'available',
      count: 1
    }
  });
  return { success: true, reward: '5元优惠券' };
};
