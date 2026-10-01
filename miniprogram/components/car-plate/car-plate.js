Component({
  properties: {
    value: {
      type: String,
      value: '',
      observer: function(newValue) {
        this.setData({
          chars: this.parsePlate(newValue)
        })
      }
    }
  },
  data: {
    provinces: ['京','津','沪','渝','冀','豫','云','辽','黑','湘','皖','鲁','新','苏','浙','赣','鄂','桂','甘','晋','蒙','陕','吉','闽','贵','粤','川','青','藏','琼','宁'],
    chars: ['', '', '', '', '', '', '', ''],
    focusedIndex: -1,
    showProvince: false,
    selectedProvince: ''
  },
  methods: {
    onCharTap: function(e) {
      var idx = e.currentTarget.dataset.idx
      this.setData({ focusedIndex: idx })
      if (idx === 0) {
        this.setData({ showProvince: true })
      }
    },
    onProvinceSelect: function(e) {
      var idx = e.detail.value
      var province = this.data.provinces[idx]
      var chars = this.data.chars.slice()
      chars[0] = province
      this.setData({
        chars: chars,
        showProvince: false,
        selectedProvince: province,
        focusedIndex: 1
      })
      this.triggerEvent('change', { value: this.getPlateValue() })
    },
    onKeyInput: function(e) {
      var value = e.detail.value.toUpperCase()
      value = value.replace(/[^A-Z0-9]/g, '')
      var idx = this.data.focusedIndex
      if (idx < 0 || idx >= 8) return
      if (value.length > 1) {
        value = value.slice(0, 1)
      }
      var chars = this.data.chars.slice()
      chars[idx] = value
      if (value && idx < 7) {
        this.setData({ chars: chars, focusedIndex: idx + 1 })
      } else {
        this.setData({ chars: chars })
      }
      this.triggerEvent('change', { value: this.getPlateValue() })
    },
    onClear: function() {
      this.setData({
        chars: ['', '', '', '', '', '', '', ''],
        focusedIndex: -1,
        showProvince: false,
        selectedProvince: ''
      })
      this.triggerEvent('change', { value: '' })
    },
    getPlateValue: function() {
      var chars = this.data.chars
      return chars.filter(function(c) { return c }).join('')
    },
    parsePlate: function(value) {
      var arr = ['', '', '', '', '', '', '', '']
      for (var i = 0; i < value.length && i < 8; i++) {
        arr[i] = value[i]
      }
      return arr
    }
  }
})
