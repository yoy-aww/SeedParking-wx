Component({
  properties: {
    coupon: { type: Object, value: {} }
  },
  data: {
    amount: 0,
    condition: '',
    type: '',
    expireDate: '',
    count: 0
  },
  observers: {
    'coupon': function(val) {
      this.setData({
        amount: val.amount || 0,
        condition: val.condition || '',
        type: val.type || '通用券',
        expireDate: val.expireDate || '永久有效',
        count: val.count || 0
      })
    }
  },
  methods: {
    onUse: function() {
      this.triggerEvent('use', { id: this.data.coupon._id })
    }
  }
})
