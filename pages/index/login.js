var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api.js';
import WxValidate from '../../utils/WxValidate';
CustomPage({
  data:{
    forget:false,
    countdown:"获取验证码"
  },
  onLoad(options){
    that = this;
    that.initValidate();
  },
  initValidate() {
    const loginRules =  {      
      phone: {
        required: true,
        tel:true,
      },
      password:{
        required: true
      }
    },loginMessages={
      phone: {
        required: "请输入登录账号",
        tel:"请输入正确的手机号"
      },
      password:{
        required: "请输入登录密码"
      }
    },forgetRules =  {      
      phone: {
        required: true,
        tel:true
      },
      code: {
        required: true
      },
      password:{
        required: true
      }
    },forgetMessages={
      phone: {
        required: "请输入手机号",
        tel:"请输入正确的手机号"
      },
      code: {
        required: "请输入验证码"
      },
      password:{
        required: "请输入新的登录密码"
      }
    };
    that.loginValidate = new WxValidate(loginRules,loginMessages);
    that.forgetValidate = new WxValidate(forgetRules,forgetMessages);
  },
  forget(){
    that.setData({
      forget:!that.data.forget
    })
  },
  async loginSubmit(e){
    console.log(e);
    let params = e.detail.value;
    if(!that.loginValidate.checkForm(params)){
      let error = that.loginValidate.errorList[0]
      return that.showTips(error.msg);
    }
    let code = await Api.wxLogin();
    params.code = code;
    let res = await Api.loginByAccount(params);
    console.log(res);
    if(res.code==0){
      wx.setStorageSync('token', res.data.token);
      wx.setStorageSync('userInfo', res.data.userInfo);
      that.showTips("登录成功","success");
      getApp().globalData.auth = true;
      setTimeout(()=>{
        that.home();
      },1000);      
    }else{
      that.showTips(res.msg);
    }
  },
  async forgetSubmit(e){
    console.log(e);
    let params = e.detail.value;
    if(!that.forgetValidate.checkForm(params)){
      let error = that.forgetValidate.errorList[0];
      console.log(error)
      return that.showTips(error.msg);
    }
    console.log(123);
    let res = await Api.passwordUpdate(params);
    console.log(res);
    if(res.code==0){
      that.showTips("密码修改成功,请重新登录","success");
      that.forget();
    }else{
      that.showTips(res.msg);
    }    
  },
  
  
  
})