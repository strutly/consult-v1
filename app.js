import Api from "./config/api";
App({
  onLaunch() {
    Api.login().then(res=>{
      if(res.code==0){
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('userInfo', res.data.userInfo);
      }
    });    
  },
  globalData: {
    
  }
})
