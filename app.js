import Api from "./config/api";
App({
  onLaunch() {
    let that = this;
    Api.login().then(res=>{
      console.log(res);
      setTimeout(()=>{
        that.globalData.login = true;
        if(res.code==0){
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userInfo', res.data.userInfo);
          that.globalData.auth = true;
        }else{
          that.globalData.auth = false;
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
        }
      },100);
    });    
  },
  globalData: {
    
  },
  watch(method) {
    var obj = this.globalData;
    if (obj.login) {
      method(obj.auth);
    } else {
      Object.defineProperty(obj, 'auth', {
        configurable: true,
        enumerable: true,
        set: function (value) {
          this._auth = value;
          method(value);
        },
        get: function () {
          return this._auth;
        }
      })
    }
  }
})
