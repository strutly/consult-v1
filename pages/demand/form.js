var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
import WxValidate from '../../utils/WxValidate';
CustomPage({

  data: {
    index:0,
    types: ['请选择咨询方式', '线上会议', '线下面谈'],
  },
  onLoad(options) {
    that = this;
    that.initValidate();
  },
  initValidate() {
    const rules = {
      title: {
        required: true
      },
      field: {
        required: true
      },
      des: {
        required: true
      },
      introduction: {
        required: true
      },
      price: {
        required: true
      },
      type: {
        required: true,
        min:1
      }
    };
    const messages = {
      title: {
        required: "请输入项目名称"
      },
      field: {
        required: "请输入技能领域"
      },
      des: {
        required: "请输入问题描述"
      },
      introduction: {
        required: "请输入项目简介"
      },
      price: {
        required: "请输入费用"
      },
      type: {
        required: "请选择咨询方式",
        min:"请选择咨询方式"
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  pickerChange(e){
    that.setData({
      index:e.detail.value
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
    that.setData({
      disabled:true
    })
    try {
      let res = await Api.demandAdd(data);
      console.log(res);
      if (res.code == 0) {
        that.showTips("提交成功", "success");
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2000)
      } else {
        that.setData({
          disabled:false
        })
        that.showTips(res.msg || "出错了");
      }
    } catch (error) {
      that.setData({
        disabled:false
      })
    }    
  }  
})