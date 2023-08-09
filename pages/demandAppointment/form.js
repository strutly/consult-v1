var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
import WxValidate from '../../utils/WxValidate';
CustomPage({

  data: {

  },

  onLoad(options) {
    that = this;
    that.initValidate();
  },
  initValidate() {
    const rules = {
      toid: {
        required: true
      },
      did: {
        required: true
      },
      appointmentTime: {
        required: true
      },
      appointmentDate: {
        required: true
      }
    };
    const messages = {
      toid: {
        required: '参数错误,请重新进入'
      },
      did: {
        required: '非法参数,请重新进入'
      },
      appointmentTime: {
        required: '请选择预约时间'
      },
      appointmentDate: {
        required: '请选择预约日期'
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  pickerChange(e) {
    console.log(e);
    let name = e.currentTarget.dataset.name;
    that.setData({
      [name]: e.detail.value
    })
  },
  submit(e) {
    console.log(e);
    let data = e.detail.value;
    if (!that.WxValidate.checkForm(data)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      that.showTips(error.msg)
      return false;
    }
    that.setData({
      disabled: true
    })
    Api.addDemandAppointment(data).then(res => {
      console.log(res);
      that.showTips("提交成功,请耐心等待审核", "success");
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2000)
    }, err => {
      that.setData({
        disabled: false
      })
      that.showTips(err.msg || "出错了");
    });
  }
})