import Api from '../../config/api';
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    loginModal: {
      type: Boolean,
      value: false
    }
  },

  data: {
    phone: "",
    countdown: "获取验证码",
    disabled: false
  },

  methods: {
    showTips(msg, type = 'error') {
      this.setData({
        show: true,
        msg: msg,
        type: type
      })
    },
    async submit(e) {
      console.log(e);
      let data = e.detail.value;
      if(data.code.length!=4) return this.showTips("请输入正确的验证码");
      let res = await Api.loginByPhone(JSON.stringify(e.detail.value))
      console.log(res);
      if (res.code == 0) {
        this.setData({
          loginModal:false
        })
        getApp().globalData.mold = res.data.mold;
        wx.setStorageSync('userInfo', res.data.userInfo);
        wx.setStorageSync('token', res.data.token);
        if (res.data.authToken) {
          wx.setStorageSync('authToken', res.data.authToken)
        }
        if (res.data.mold == 1) {
          wx.switchTab({
            url: '/pages/index/my'
          })
        } else {
          wx.switchTab({
            url: '/pages/expert/index',
          })
        }
      } else {
        this.showTips(res.msg)
      }
    },
    phoneChange(e) {
      console.log(e);
      this.setData({
        phone: e.detail.value
      })
    },
    hideModal() {
      this.setData({
        loginModal: false
      })
    },
    getCode() {
      let phone = this.data.phone;
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      console.log(reg.test(phone));
      if (!reg.test(phone)) return this.showTips("请输入正确的手机号");
      Api.getPhoneCode({
        phone: phone
      }).then(res => {
        console.log(res);
      });

      this.timer();
    },
    timer() {
      let that = this;
      let min = 0
      let max = 60;
      let countdown = setInterval(() => {
        if (max > min) {
          max--;
          that.setData({
            countdown: max,
            disabled: true
          })
        } else {
          that.setData({
            disabled: false,
            countdown: "获取验证码"
          })
          clearInterval(countdown);
        }
      }, 1000)
    }
  }
})
