const api = require('../../utils/api');
const auth = require('../../utils/auth');

Page({
  data: {
    phone: '',
    code: '',
    agreed: false,
    sending: false,
    countdown: 0,
    canSubmit: false
  },
  onLoad() {
    this.updateCanSubmit();
  },
  inputPhone(e) {
    this.setData({ phone: e.detail.value });
    this.updateCanSubmit();
  },
  inputCode(e) {
    this.setData({ code: e.detail.value });
    this.updateCanSubmit();
  },
  async getCode() {
    if (this.data.sending || this.data.countdown > 0) return;
    if (!this.data.phone || !/^1\d{10}$/.test(this.data.phone)) {
      wx.showToast({ title: '请输入正确手机号', icon: 'none' });
      return;
    }
    try {
      await api.sendCode(this.data.phone);
      this.setData({ sending: true, countdown: 60 });
      this.startCountdown();
      wx.showToast({ title: '验证码已发送', icon: 'success' });
    } catch (e) {
      console.error('发送验证码失败', e);
      wx.showToast({ title: '发送失败，请重试', icon: 'none' });
    } finally {
      this.setData({ sending: false });
    }
  },
  startCountdown() {
    const timer = setInterval(() => {
      const countdown = this.data.countdown - 1;
      this.setData({ countdown });
      if (countdown <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  },
  checkAgree() {
    this.setData({ agreed: !this.data.agreed });
    this.updateCanSubmit();
  },
  async submitLogin() {
    if (!this.data.canSubmit) return;
    wx.showLoading({ title: '登录中...' });
    try {
      const res = await api.login({ phone: this.data.phone, code: this.data.code });
      auth.setToken(res.token);
      wx.showToast({ title: '登录成功', icon: 'success' });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    } catch (e) {
      console.error('登录失败', e);
      wx.showToast({ title: e.message || '登录失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },
  skipLogin() {
    wx.navigateBack();
  },
  updateCanSubmit() {
    this.setData({
      canSubmit: this.data.phone.length === 11 && this.data.code.length === 6 && this.data.agreed
    });
  }
});