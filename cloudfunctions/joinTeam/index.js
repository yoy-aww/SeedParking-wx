const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { openid, teamId } = event;
  const teamResult = await db.collection('teams').doc(teamId).get();
  const team = teamResult.data;
  if (!team) {
    return { success: false, msg: '队伍不存在' };
  }
  if (team.memberCount >= team.maxCount) {
    return { success: false, msg: '队伍已满' };
  }
  if (team.members.indexOf(openid) !== -1) {
    return { success: false, msg: '已在队伍中' };
  }
  await db.collection('teams').doc(teamId).update({
    data: {
      members: _.addToSet(openid),
      memberCount: _.inc(1),
      status: team.memberCount + 1 >= team.maxCount ? 'full' : team.status
    }
  });
  return { success: true };
};
