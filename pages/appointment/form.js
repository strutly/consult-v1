var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
import WxValidate from '../../utils/WxValidate';
CustomPage({
  data: {
    types:['请选择咨询形式','视频会议','线下交流'],    
    formData:{
      type:0
    },
    minDate:new Date().toLocaleDateString()
  },
  onLoad(options) {
    console.log(options)
    that = this;
    that.setData({
      toid:options.id
    });
    that.initValidate();
  },
  initValidate() {
    const rules = {
      toid:{
        required: true
      },
      type: {
        required: true,
        min: 1
      },
      appointmentTime: {
        required: true
      },
      appointmentDate: {
        required: true
      },
      price:{
        required: true
      },
      content:{
        required:true
      }
    };
    const messages = {
      toid:{
        required: '参数错误,请重新进入'
      },
      type: {
        required: '请选择问题类型',
        min: '请选择问题类型'
      },
      appointmentTime: {
        required: '请选择预约时间'
      },
      appointmentDate: {
        required: '请选择预约日期'
      },
      price:{
        required: '请输入咨询价格'
      },
      content:{
        required:'请简要描述咨询内容'
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  pickerChange(e){
    console.log(e);
    let name = e.currentTarget.dataset.name;
    that.setData({
      ['formData.'+name]:e.detail.value
    })
  },
  async submit(e) {
    console.log(e);
    let data = e.detail.value;
    if (!that.WxValidate.checkForm(data)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      that.showTips(error.msg)
      return false;
    }    
    let res = await Api.addAppointment(data);
    console.log(res);
    if (res.code == 0) {
      that.showTips("提交成功,请耐心等待审核", "success");
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2000)
    }else{
      that.showTips(res.msg||"出错了");
    }
  }

})
