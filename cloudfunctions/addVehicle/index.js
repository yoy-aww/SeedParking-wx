const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { openid, plate, isDefault } = event;
  const vehicleCol = db.collection('vehicles');
  if (isDefault) {
    await vehicleCol.where({ _openid: openid, isDefault: true }).update({
      data: { isDefault: false }
    });
  }
  const result = await vehicleCol.add({
    data: {
      _openid: openid,
      plate,
      isDefault: isDefault || false,
      createTime: db.serverDate()
    }
  });
  return { success: true, id: result._id };
};
