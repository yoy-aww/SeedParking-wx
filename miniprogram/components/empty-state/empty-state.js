Component({
  properties: {
    icon: { type: String, value: '📭' },
    title: { type: String, value: '暂无数据' },
    desc: { type: String, value: '' },
    buttonText: { type: String, value: '' },
    showButton: { type: Boolean, value: false }
  },
  methods: {
    onAction: function() {
      this.triggerEvent('action')
    }
  }
})
