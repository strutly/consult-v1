var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
import WxValidate from '../../utils/WxValidate';
CustomPage({
  data: {
    disabled: false
  },
  onLoad(options) {
    that = this;
    that.initValidate();
  },
  initValidate() {
    const rules = {
      name: {
        required: true
      },
      cardNo: {
        required: true
      },
      bankName: {
        required: true
      },
      total: {
        required: true
      }
    };
    const messages = {
      name: {
        required: "请输入姓名"
      },
      cardNo: {
        required: "请输入银行卡号"
      },
      bankName: {
        required: "请输入银行卡开户行"
      },
      total: {
        required: "请输入提现金额"
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },

  cardNoChange(e) {
    console.log(e)
    Api.withdrawalBank({
      cardNo: e.detail.value
    }).then(res => {
      that.setData({
        bankName: res.data
      })
    }, err => {
      console.log(err)
    });
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
      disabled: true
    })
    Api.withdrawalAdd(data).then(res => {
      console.log(res);
      that.showTips("申请成功,请耐心等待", "success");
      setTimeout(() => {
        that.back();
      }, 1500);
    }, err => {
      that.setData({
        disabled: false
      })
      that.showTips(err.msg);
    });
  }
})