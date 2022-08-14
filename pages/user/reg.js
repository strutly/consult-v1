
var that;
import Api from "../../config/api";
import CustomPage from '../../CustomPage';
import WxValidate from "../../utils/WxValidate";
CustomPage({
  data: {
    countdown:"获取验证码"
  },
  onLoad(options){
    console.log(options);
    that = this;
    that.initValidate(options.type);
  },
  initValidate(type) {
    const rules =  {      
      name: {
        required: true
      },
      country:{
        required: true
      },
      phone: {
        required: true,
        tel:true
      },
      code:{
        required: true
      },
      password:{
        required: true
      }
    };
    const messages = {
      
      name: {
        required: "请输入姓名"
      },
      country:{
        required: "请输入国家"
      },
      phone: {
        required: "请输入手机号",
        tel:"请输入正确的手机号"
      },
      code:{
        required: "请输入验证码"
      },
      password:{
        required: "请输入密码"
      },      
      
    };
    if(type>1){
      rules.unit= {required: true};
      rules.post={required: true};
      messages.unit={required: "请输入单位"};
      messages.post={required: "请输入职务"};
    }
    that.WxValidate = new WxValidate(rules, messages);
  },
  async submit(e) {
    console.log(e);    
    let data = e.detail.value;
    if (!that.WxValidate.checkForm(data)) {
      let error = that.WxValidate.errorList[0];      
      return that.showTips(error.msg);
    }
    
    let res = await Api.addUserAdmin(data);
    console.log(res);
    if (res.code == 0) {
      that.showTips("注册成功,请前往登录", "success");
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/login.js',
        })
      }, 2000)
    }else{
      that.showTips(res.msg||"出错了","error");
    }
  }
})
