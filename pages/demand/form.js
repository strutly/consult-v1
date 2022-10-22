var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
import WxValidate from '../../utils/WxValidate';
CustomPage({

  data: {
    demand: { type: 0 },
    priceVal:'',
    types: ['请选择咨询方式', '线上会议', '线下面谈'],
  },
  async onLoad(options) {
    that = this;
    if (options.id) {
      let res = await Api.demandDetail({ id: options.id });
      that.setData({
        demand: res.data
      })
    }
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
        min: 1
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
        min: "请选择咨询方式"
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  pickerChange(e) {
    that.setData({
      ['demand.type']: e.detail.value
    })
  },
  priceFocus(e){
    let price = that.data.demand.price;
    that.setData({
      priceVal:price
    })
  },
  priceChange(e){
    that.setData({
      ['demand.price']: e.detail.value,
      priceVal:e.detail.value+"元/小时"
    })
  },
  async submit(e) {
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
    try {
      let res = {};
      if (data.id) {
        console.log("update")
        res = await Api.demandUpdate(data);
      } else {
        res = await Api.demandAdd(data);
      }
      console.log(res);
      if (res.code == 0) {
        that.showTips("提交成功", "success");
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
            success(){
              var pages = getCurrentPages();
              pages[pages.length - 1].reLoad();
            }
          })
        }, 500)
      } else {
        that.setData({
          disabled: false
        })
        that.showTips(res.msg || "出错了");
      }
    } catch (error) {
      that.setData({
        disabled: false
      })
    }
  }
})