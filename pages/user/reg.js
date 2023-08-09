
var that;
import Api from "../../config/api";
import CustomPage from '../../CustomPage';
import WxValidate from "../../utils/WxValidate";
CustomPage({
  data: {
    countdown: "获取验证码",
    sexArr: ['请选择性别', '男', '女']
  },
  onLoad(options) {
    console.log(options);
    that = this;
    that.initValidate(options.type);
  },
  initValidate(type) {
    const rules = {
      name: {
        required: true
      },
      gender: {
        required: true,
        min: 1
      },
      country: {
        required: true
      },
      phone: {
        required: true,
        tel: true
      },
      code: {
        required: true
      },
      password: {
        required: true
      }
    };
    const messages = {

      name: {
        required: "请输入姓名"
      },
      gender: {
        required: "请选择性别",
        min: "请选择性别"
      },
      country: {
        required: "请输入国家"
      },
      phone: {
        required: "请输入手机号",
        tel: "请输入正确的手机号"
      },
      code: {
        required: "请输入验证码"
      },
      password: {
        required: "请输入密码"
      },

    };
    if (type > 0) {
      rules.unit = { required: true };
      rules.post = { required: true };
      messages.unit = { required: "请输入单位" };
      messages.post = { required: "请输入职务" };
    }
    that.WxValidate = new WxValidate(rules, messages);
  },
  chooseCountry(e) {
    that.setData({
      country: e.detail.name
    });
    that.countryModal();
  },
  countryModal() {
    that.setData({
      countryModal: !that.data.countryModal
    })
  },
  pickerChange(e) {
    let name = e.currentTarget.dataset.name;
    that.setData({
      [name]: e.detail.value
    })
  },
  submit(e) {
    console.log(e);
    let data = e.detail.value;
    if (!that.WxValidate.checkForm(data)) {
      let error = that.WxValidate.errorList[0];
      return that.showTips(error.msg);
    }
    Api.addUserAdmin(data).then(res => {
      console.log(res);
      that.showTips("注册成功,请前往登录", "success");
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/login',
        })
      }, 2000)
    }, err => {
      that.showTips(err.msg || "出错了", "error");
    });
  }
})
