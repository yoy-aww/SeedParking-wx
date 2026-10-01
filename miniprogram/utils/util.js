module.exports = {
  formatPrice: function(price) {
    return price === 0 || !price ? '免费' : '¥' + price
  },
  formatDistance: function(km) {
    if (!km) return '距离未知'
    return km + 'km'
  },
  formatDate: function(date) {
    if (!date) return ''
    var d = new Date(date)
    var y = d.getFullYear()
    var m = String(d.getMonth() + 1).padStart(2, '0')
    var day = String(d.getDate()).padStart(2, '0')
    return y + '-' + m + '-' + day
  },
  formatDateTime: function(date) {
    if (!date) return ''
    var d = new Date(date)
    var y = d.getFullYear()
    var m = String(d.getMonth() + 1).padStart(2, '0')
    var day = String(d.getDate()).padStart(2, '0')
    var h = String(d.getHours()).padStart(2, '0')
    var min = String(d.getMinutes()).padStart(2, '0')
    return y + '-' + m + '-' + day + ' ' + h + ':' + min
  },
  showToast: function(title, icon) {
    wx.showToast({ title: title, icon: icon || 'none', duration: 2000 })
  },
  showModal: function(title, content, confirmText, cancelText) {
    return new Promise(function(resolve) {
      wx.showModal({
        title: title || '',
        content: content || '',
        confirmText: confirmText || '确定',
        cancelText: cancelText || '取消',
        success: function(res) {
          resolve(res.confirm)
        }
      })
    })
  },
  provinces: [
    {code:'京',name:'北京'},{code:'沪',name:'上海'},{code:'津',name:'天津'},{code:'渝',name:'重庆'},
    {code:'辽',name:'辽宁'},{code:'吉',name:'吉林'},{code:'黑',name:'黑龙江'},{code:'苏',name:'江苏'},
    {code:'浙',name:'浙江'},{code:'皖',name:'安徽'},{code:'闽',name:'福建'},{code:'赣',name:'江西'},
    {code:'鲁',name:'山东'},{code:'豫',name:'河南'},{code:'鄂',name:'湖北'},{code:'湘',name:'湖南'},
    {code:'粤',name:'广东'},{code:'桂',name:'广西'},{code:'琼',name:'海南'},{code:'川',name:'四川'},
    {code:'贵',name:'贵州'},{code:'云',name:'云南'},{code:'藏',name:'西藏'},{code:'陕',name:'陕西'},
    {code:'甘',name:'甘肃'},{code:'青',name:'青海'},{code:'宁',name:'宁夏'},{code:'新',name:'新疆'},
    {code:'蒙',name:'内蒙古'},{code:'港',name:'香港'},{code:'澳',name:'澳门'},{code:'台',name:'台湾'}
  ]
}
