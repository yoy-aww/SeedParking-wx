// utils/api.js - 统一API调用封装（含模拟数据，无需后端即可运行）
function callCloud(name, data) {
  return new Promise(function(resolve, reject) {
    wx.cloud.callFunction({
      name: name,
      data: data || {},
      success: function(res) {
        resolve(res.result);
      },
      fail: function(err) {
        console.error('云函数调用失败:', name, err);
        reject(err);
      }
    });
  });
}

// 模拟数据
var MOCK_DATA = {
  categories: [
    { id: 'airport', name: '机场停车', icon: '✈', color: '#1E7EF0', desc: '机场航站楼周边停车场' },
    { id: 'railway', name: '高铁停车', icon: '🚄', color: '#07C160', desc: '高铁站周边停车场' },
    { id: 'hospital', name: '医院停车', icon: '🏥', color: '#FF4444', desc: '三甲医院周边停车场' },
    { id: 'mall', name: '商场停车', icon: '🛍', color: '#FF8C00', desc: '商圈停车场' },
    { id: 'office', name: '办公停车', icon: '🏢', color: '#9B59B6', desc: '写字楼停车场' }
  ],
  parkingLots: [
    { id: 'lot_001', name: '首都机场T3航站楼停车场', category: 'airport', address: '顺义区机场东路10号', distance: '0.5km', price: 15, capacity: 120, total: 200, rating: 4.8 },
    { id: 'lot_002', name: '大兴机场地面停车场', category: 'airport', address: '大兴区义和庄', distance: '1.2km', price: 12, capacity: 80, total: 150, rating: 4.5 },
    { id: 'lot_003', name: '北京南站P2停车场', category: 'railway', address: '丰台区永外大街', distance: '0.3km', price: 10, capacity: 60, total: 100, rating: 4.6 },
    { id: 'lot_004', name: '北京西站地下停车场', category: 'railway', address: '海淀区月坛北街', distance: '0.2km', price: 8, capacity: 45, total: 80, rating: 4.7 },
    { id: 'lot_005', name: '北京协和医院停车场', category: 'hospital', address: '东城区帅府园1号', distance: '0.1km', price: 20, capacity: 30, total: 50, rating: 4.9 },
    { id: 'lot_006', name: '北京大学肿瘤医院停车场', category: 'hospital', address: '朝阳区健德路158号', distance: '0.4km', price: 18, capacity: 50, total: 80, rating: 4.6 },
    { id: 'lot_007', name: '三里屯太古里停车场', category: 'mall', address: '朝阳区三里屯路19号', distance: '0.2km', price: 25, capacity: 100, total: 200, rating: 4.7 },
    { id: 'lot_008', name: '国贸CBD停车场', category: 'mall', address: '朝阳区建国门外大街', distance: '0.3km', price: 30, capacity: 80, total: 150, rating: 4.5 },
    { id: 'lot_009', name: '中关村软件园停车场', category: 'office', address: '海淀区西北旺东路', distance: '0.5km', price: 10, capacity: 90, total: 120, rating: 4.4 },
    { id: 'lot_010', name: '望京SOHO地下车库', category: 'office', address: '朝阳区望京街', distance: '0.2km', price: 20, capacity: 55, total: 100, rating: 4.6 },
    { id: 'lot_011', name: '首都机场P4停车场', category: 'airport', address: '顺义区天柱西路', distance: '2.0km', price: 8, capacity: 150, total: 200, rating: 4.2 },
    { id: 'lot_012', name: '北京南站P1停车场', category: 'railway', address: '丰台区南三环', distance: '0.1km', price: 12, capacity: 70, total: 120, rating: 4.5 }
  ],
  orders: [
    { id: 'ORD2026100001', parkingName: '首都机场T3航站楼停车场', plate: '京A12345', status: 'completed', statusText: '已完成', statusClass: 'green', startTime: '10/01 08:00', endTime: '10/02 20:00', amount: 260, parkingId: 'lot_001' },
    { id: 'ORD2026090001', parkingName: '北京南站P2停车场', plate: '京B67890', status: 'entered', statusText: '已入场', statusClass: 'blue', startTime: '09/28 14:00', endTime: '09/29 18:00', amount: 120, parkingId: 'lot_003' },
    { id: 'ORD2026090000', parkingName: '三里屯太古里停车场', plate: '京A12345', status: 'pending', statusText: '待支付', statusClass: 'orange', startTime: '09/25 10:00', endTime: '09/25 22:00', amount: 180, parkingId: 'lot_007' },
    { id: 'ORD2026090002', parkingName: '中关村软件园停车场', plate: '京C55555', status: 'cancelled', statusText: '已取消', statusClass: 'gray', startTime: '09/20 09:00', endTime: '09/20 18:00', amount: 90, parkingId: 'lot_009' }
  ],
  vehicles: [
    { id: 'v_001', plate: '京A12345', isDefault: true },
    { id: 'v_002', plate: '京B67890', isDefault: false }
  ],
  coupons: [
    { id: 'c_001', name: '新用户专享', type: 'discount', value: 10, condition: '满50可用', status: 'available', expireDate: '2026-10-15' },
    { id: 'c_002', name: '限时优惠', type: 'discount', value: 5, condition: '满30可用', status: 'available', expireDate: '2026-10-20' },
    { id: 'c_003', name: '满减券', type: 'discount', value: 20, condition: '满100可用', status: 'used', expireDate: '2026-09-30' },
    { id: 'c_004', name: '机场停车券', type: 'discount', value: 15, condition: '机场停车满50可用', status: 'available', expireDate: '2026-11-01' }
  ],
  cards: [
    { id: 'card_001', name: '10次停车卡', price: 88, visits: 10, desc: '10次停车，送15张优惠券', used: 0, active: false },
    { id: 'card_002', name: '20次停车卡', price: 158, visits: 20, desc: '20次停车，送30张优惠券', used: 0, active: false }
  ],
  teams: [
    { id: 'team_001', name: '我的停车队', members: 2, total: 3, status: 'active', membersList: ['用户A', '用户B'], statusText: '进行中', progress: 67 }
  ]
};

// API方法 — 全部返回模拟数据，无需后端
function getRecommendations(page) {
  return Promise.resolve({ code: 0, data: { list: MOCK_DATA.parkingLots, page: page || 1, hasMore: false } });
}

function getHomeData() {
  return Promise.resolve({ code: 0, data: { categories: MOCK_DATA.categories, parkingLots: MOCK_DATA.parkingLots, banners: MOCK_DATA.parkingLots.slice(0, 3) } });
}

function getListData(category) {
  var lots = category ? MOCK_DATA.parkingLots.filter(function(l) { return l.category === category; }) : MOCK_DATA.parkingLots;
  return Promise.resolve({ code: 0, data: { list: lots, total: lots.length } });
}

function getParkingLots() {
  return Promise.resolve({ code: 0, data: { list: MOCK_DATA.parkingLots } });
}

function getOrders(tab) {
  var orders = MOCK_DATA.orders;
  if (tab && tab !== 'all') {
    orders = orders.filter(function(o) { return o.status === tab; });
  }
  return Promise.resolve({ code: 0, data: { list: orders, total: orders.length, totalCount: MOCK_DATA.orders.length, enteredCount: MOCK_DATA.orders.filter(function(o) { return o.status === 'entered'; }).length } });
}

function getOrderById(id) {
  var order = MOCK_DATA.orders.find(function(o) { return o.id === id; });
  return Promise.resolve({ code: 0, data: order || null });
}

function getUserVehicles() {
  return Promise.resolve({ code: 0, data: { list: MOCK_DATA.vehicles } });
}

function getVehicles() {
  return Promise.resolve({ code: 0, data: MOCK_DATA.vehicles });
}

function addVehicle(plate, isDefault) {
  MOCK_DATA.vehicles.push({ id: 'v_' + Date.now(), plate: plate, isDefault: isDefault });
  return Promise.resolve({ code: 0, message: '添加成功' });
}

function deleteVehicle(id) {
  MOCK_DATA.vehicles = MOCK_DATA.vehicles.filter(function(v) { return v.id !== id; });
  return Promise.resolve({ code: 0, message: '删除成功' });
}

function setDefaultVehicle(id) {
  MOCK_DATA.vehicles.forEach(function(v) { v.isDefault = v.id === id; });
  return Promise.resolve({ code: 0, message: '设置成功' });
}

function updateVehicle(id, data) {
  var v = MOCK_DATA.vehicles.find(function(x) { return x.id === id; });
  if (v) { Object.assign(v, data); }
  return Promise.resolve({ code: 0, message: '更新成功' });
}

function getUserCoupons(tab) {
  var coupons = MOCK_DATA.coupons;
  if (tab && tab !== 'all') {
    coupons = coupons.filter(function(c) { return c.status === tab; });
  }
  return Promise.resolve({ code: 0, data: { list: coupons } });
}

function getCoupons() {
  return Promise.resolve({ code: 0, data: MOCK_DATA.coupons });
}

function getCards() {
  return Promise.resolve({ code: 0, data: MOCK_DATA.cards });
}

function getCardById(id) {
  var card = MOCK_DATA.cards.find(function(c) { return c.id === id; });
  return Promise.resolve({ code: 0, data: card || null });
}

function createCardOrder(cardId) {
  return Promise.resolve({ code: 0, data: { orderId: 'card_ord_' + Date.now(), amount: 88 }, message: '下单成功' });
}

function createOrder() {
  return Promise.resolve({ code: 0, data: { orderId: 'ord_' + Date.now() }, message: '预约成功' });
}

function updateOrderStatus(id, status) {
  var o = MOCK_DATA.orders.find(function(x) { return x.id === id; });
  if (o) { o.status = status; }
  return Promise.resolve({ code: 0, message: '更新成功' });
}

function createTeam() {
  return Promise.resolve({ code: 0, data: { teamId: 'team_' + Date.now(), inviteCode: 'SP' + Math.random().toString(36).substring(2, 8).toUpperCase() } });
}

function joinTeam(teamId) {
  return Promise.resolve({ code: 0, message: '加入成功' });
}

function getTeamHistory() {
  return Promise.resolve({ code: 0, data: MOCK_DATA.teams });
}

function getMyTeam() {
  return Promise.resolve({ code: 0, data: MOCK_DATA.teams[0] || null });
}

function claimReward(teamId) {
  return Promise.resolve({ code: 0, message: '领取成功' });
}

function disbandTeam() {
  return Promise.resolve({ code: 0, message: '解散成功' });
}

function submitPartnerApply(data) {
  return Promise.resolve({ code: 0, message: '提交成功，我们将在1-3个工作日内联系您' });
}

function submitParkingInfo(data) {
  return Promise.resolve({ code: 0, message: '提交成功' });
}

function submitParkingDetail(data) {
  return Promise.resolve({ code: 0, message: '提交成功' });
}

function getPayParams(orderId) {
  return Promise.resolve({ code: 0, data: { orderId: orderId, timeStamp: String(Date.now()), nonceStr: 'nonce_' + Math.random().toString(36).substring(2, 10), package: 'prepay_id=mock_' + Date.now(), signType: 'MD5', paySign: 'mock_sign' } });
}

function login(phone, code) {
  return Promise.resolve({ code: 0, data: { token: 'mock_token_' + Date.now(), user: { nickName: '种子用户', phone: phone, avatarUrl: '' } }, message: '登录成功' });
}

function sendCode(phone) {
  return Promise.resolve({ code: 0, message: '验证码已发送' });
}

module.exports = {
  callCloud: callCloud,
  getHomeData: getHomeData,
  getListData: getListData,
  getParkingLots: getParkingLots,
  getRecommendations: getRecommendations,
  getOrders: getOrders,
  getOrderById: getOrderById,
  getUserVehicles: getUserVehicles,
  getVehicles: getVehicles,
  addVehicle: addVehicle,
  deleteVehicle: deleteVehicle,
  setDefaultVehicle: setDefaultVehicle,
  updateVehicle: updateVehicle,
  getUserCoupons: getUserCoupons,
  getCoupons: getCoupons,
  getCards: getCards,
  getCardById: getCardById,
  createCardOrder: createCardOrder,
  createOrder: createOrder,
  updateOrderStatus: updateOrderStatus,
  createTeam: createTeam,
  joinTeam: joinTeam,
  getTeamHistory: getTeamHistory,
  getMyTeam: getMyTeam,
  claimReward: claimReward,
  disbandTeam: disbandTeam,
  submitPartnerApply: submitPartnerApply,
  submitParkingInfo: submitParkingInfo,
  submitParkingDetail: submitParkingDetail,
  getPayParams: getPayParams,
  login: login,
  sendCode: sendCode
};