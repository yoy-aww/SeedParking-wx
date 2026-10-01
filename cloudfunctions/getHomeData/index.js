const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const categories = [
    { id: 'commute', name: '上班通勤', icon: '🚗' },
    { id: 'shopping', name: '逛街购物', icon: '🛒' },
    { id: 'hospital', name: '医院就医', icon: '🏥' },
    { id: 'airport', name: '机场火车站', icon: '✈️' },
    { id: 'nearby', name: '附近即停', icon: '📍' }
  ];
  const banners = [
    { id: 1, title: '新用户停车礼包', subtitle: '3张优惠券等你领', image: 'cloud://new-user-banner', link: '/pages/coupon/coupon' }
  ];
  const recommendations = [
    { id: 1, name: '国贸购物中心停车场', address: '北京市朝阳区建国路87号', distance: 0.3, price: 10, rating: 4.8, spots: 120 },
    { id: 2, name: '三里屯太古里停车场', address: '北京市朝阳区三里屯路19号', distance: 0.8, price: 15, rating: 4.9, spots: 85 },
    { id: 3, name: '蓝色港湾停车场', address: '北京市朝阳区朝阳公园路6号', distance: 1.2, price: 8, rating: 4.7, spots: 200 }
  ];
  return { categories, banners, recommendations };
};
