const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const openid = event.openid;
  const captainTeams = await db.collection('teams').where({ _openid: openid }).orderBy('createTime', 'desc').limit(50).get();
  const captainIds = captainTeams.data.map(t => t._id);
  let allTeams = [];
  if (captainIds.length > 0) {
    allTeams = await db.collection('teams').where({
      _id: db.command.in(captainIds)
    }).orderBy('createTime', 'desc').limit(50).get();
  }
  return { teams: allTeams.data };
};
