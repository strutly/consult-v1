
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
  },
  initValidate(index) {
    const rules = [{
      phone: {
        required: true,
        tel:true
      },
      code:{
        required: true
      },
      name: {
        required: true
      },
      title: {
        required: true
      }
    }, {
      phone: {
        required: true,
        tel:true
      },
      code:{
        required: true
      },
      name: {
        required: true
      },
      sex: {
        min: 1
      },
      area: {
        required: true
      },
      through: {
        required: true
      }
    }]
    const messages = [{
      phone: {
        required: "请输入正确的手机号",
        tel:"请输入正确的手机号"
      },
      code:{
        required: "请输入验证码"
      },
      name: {
        required: "请输入您的姓名"
      },
      title: {
        required: "请输入公司名称"
      }
    }, {
      phone: {
        required: "请输入正确的手机号",
        tel:"请输入正确的手机号"
      },
      code:{
        required: "请输入验证码"
      },
      name: {
        required: "请输入您的姓名"
      },
      sex: {
        min: "请选择您的性别"
      },
      area: {
        required: "请输入您的领域方向"
      },
      through: {
        required: "请输入您的经历"
      }
    }]
    that.WxValidate = new WxValidate(rules[index], messages[index]);
  },
  phoneChange(e) {
    console.log(e);
    that.setData({
      ['apply.phone']: e.detail.value
    })
  },

  hideModal() {
    that.setData({
      loginModal: false
    })
  },
  getCode() {
    let phone = that.data.apply.phone;
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    console.log(reg.test(phone));
    if (!reg.test(phone)) return that.showTips("请输入正确的手机号");
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
  categoryChange(e) {
    console.log(e);
    let index = e.detail.value;
    that.setData({
      'apply.type': index
    })
    that.initValidate(index);
  },
  sexChange(e) {
    console.log(e);
    that.setData({
      ['apply.sex']: e.detail.value
    })
  },

  showTips(msg, type = "error") {
    that.setData({
      msg: msg,
      type: type,
      show: true
    })
  },
  upload(){
    wx.chooseMessageFile({
      count: 1,
      type:'all',
      success:function(res){
        let types = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff','pdf'];
        var filename = res.tempFiles[0].name;        
        let fileType = filename.substr(filename.lastIndexOf('.') + 1)
        if(types.indexOf(fileType.toLowerCase())==-1){
          wx.showToast({
            icon:'none',
            title: '请上传图片或者PDF形式附件'
          })
        }else{
          Api.uploadFile(res.tempFiles[0].path).then(res=>{
            console.log(res)
          })

        }
        console.log(res);
      }
    })
  },
  async submit(e) {
    console.log(e);
    if (!that.WxValidate.checkForm(e.detail.value)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      that.showTips(error.msg)
      return false;
    }
    let data = e.detail.value;
    let res = {};
    if (data.type == 0) {
      res = await Api.addEnterpriseApply(data);
    } else {
      res = await Api.addExpertApply(data);
    };
    console.log(res);
    if (res.code == 0) {
      that.showTips("提交成功,请耐心等待审核", "success");
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2000)
    }else{
      that.showTips(res.msg||"出错了","error");
    }
  }
})
