const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const category = event.category;
  const filters = event.filters || {};
  const allLotTypes = [
    { id: 1, name: '国贸购物中心停车场', type: 'mall', address: '北京市朝阳区建国路87号', distance: 0.3, price: 10, spots: 120, services: ['室内','空调','充电'], facilities: ['监控','门禁'] },
    { id: 2, name: '三里屯太古里停车场', type: 'mall', address: '北京市朝阳区三里屯路19号', distance: 0.8, price: 15, spots: 85, services: ['室内','空调'], facilities: ['监控'] },
    { id: 3, name: '朝阳大悦城停车场', type: 'mall', address: '北京市朝阳区朝阳北路101号', distance: 1.5, price: 12, spots: 300, services: ['室内','空调','充电'], facilities: ['监控','门禁'] },
    { id: 4, name: '北京协和医院停车场', type: 'hospital', address: '北京市东城区帅府园1号', distance: 2.1, price: 20, spots: 50, services: ['室内'], facilities: ['监控','无障碍'] },
    { id: 5, name: '首都机场T3停车场', type: 'airport', address: '北京市顺义区', distance: 35.0, price: 15, spots: 500, services: ['室外'], facilities: ['监控','收费'] },
    { id: 6, name: '北京南站地下停车场', type: 'railway', address: '北京市丰台区永外车站西街', distance: 28.0, price: 12, spots: 200, services: ['室内'], facilities: ['监控','门禁'] },
    { id: 7, name: '望京SOHO停车场', type: 'office', address: '北京市朝阳区望京街6号', distance: 3.2, price: 8, spots: 400, services: ['室内','空调','充电'], facilities: ['监控','门禁'] },
    { id: 8, name: '中关村广场停车场', type: 'office', address: '北京市海淀区中关村大街', distance: 4.5, price: 10, spots: 150, services: ['室内'], facilities: ['监控'] }
  ];
  let filtered = allLotTypes;
  if (category && category !== 'all') {
    filtered = filtered.filter(lot => lot.type === category);
  }
  if (filters.distance) {
    filtered = filtered.filter(lot => lot.distance <= Number(filters.distance));
  }
  if (filters.price) {
    filtered = filtered.filter(lot => lot.price <= Number(filters.price));
  }
  if (filters.indoor) {
    filtered = filtered.filter(lot => lot.services && lot.services.includes('室内'));
  }
  if (filters.service && filters.service.length > 0) {
    filtered = filtered.filter(lot => {
      return filters.service.every(s => lot.services && lot.services.includes(s));
    });
  }
  if (filters.facility && filters.facility.length > 0) {
    filtered = filtered.filter(lot => {
      return filters.facility.every(f => lot.facilities && lot.facilities.includes(f));
    });
  }
  return { list: filtered, total: filtered.length };
};
