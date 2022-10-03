
import Api from './config/api';
const CustomPage = function (page) {
  return Page(
    Object.assign({}, page, {
      onLoad(options) {
        this.setData({
          options:options
        })
        page.onLoad && page.onLoad.call(this, options)
      },
      toUrl(e) {
        console.log(e)
        let url = e.currentTarget.dataset.url;
        let msg = e.currentTarget.dataset.msg||'正在开发中~'
        if (url) {
          wx.navigateTo({
            url: url,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: msg,
          })
        }
      },
      onReady(){
        console.log(2)
        this.setData({
          userInfo:wx.getStorageSync('userInfo')
        })
        page.onReady && page.onReady.call(this)
      },
      phoneChange(e) {
        console.log(e);
        this.setData({
          phone: e.detail.value
        })
      },
      getCode() {
        console.log(12)
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
      },
      back() {
        if (getCurrentPages().length > 1) {
          wx.navigateBack({
            delta: 1
          })
        }
      },
      home() {
        wx.switchTab({
          url: '/pages/index/home',
        })
      },
      showTips(msg="出错了~", errorType = "error") {
        this.setData({
          errorMsg: msg,
          errorType: errorType,
          errorShow: true
        })
      },
      reLoad(){
        this.onLoad(this.data.options)
      }
    })
  )
}

export default CustomPage