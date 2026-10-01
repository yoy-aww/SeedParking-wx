const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const data = event.data || {};
  const openid = cloud.getWXContext().OPENID;
  const apply = {
    _openid: openid,
    contact: data.contact || '',
    manager: data.manager || '',
    lot: data.lot || '',
    phone: data.phone || '',
    address: data.address || '',
    createTime: db.serverDate(),
    status: 'pending'
  };
  const result = await db.collection('partner-applications').add({ data: apply });
  return { success: true, id: result._id };
};
