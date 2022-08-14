var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
CustomPage({
  data: {
    userInfo: wx.getStorageSync('userInfo')
  },
  onLoad(options) {
    console.log(options);
    that = this;
  },
  async getUserProfile(e) {
    console.log(e);
    try {
      let userInfo = await wx.getUserProfile({ desc: '用于完善会员资料' });
      console.log(userInfo)
      if (userInfo.errMsg !== 'getUserProfile:ok') {
        that.showTips("您已经拒绝获取用户信息~", "error");
        return;
      }
      let code = await Api.getCode();
      let res = await Api.auth({
        code: code,
        encryptedData: userInfo.encryptedData,
        iv: userInfo.iv,
        signature: userInfo.signature,
        rawData: userInfo.rawData
      });
      console.log(res);
      wx.removeStorageSync('code');
      if (res.code == 0) {
        that.showTips("授权成功", "success");
        that.setData({
          auth: true,
          userInfo: res.data
        });
      } else {
        that.showTips(res.msg, "error");
      }
    } catch (error) {
      console.log(error);
      that.showTips("您已经拒绝获取用户信息~", "error");
    }
  },
})
