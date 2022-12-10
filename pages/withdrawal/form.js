var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
import WxValidate from '../../utils/WxValidate';
CustomPage({
  data: {
    disabled:false
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

  async cardNoChange(e) {
    console.log(e)
    let res = await Api.withdrawalBank({
      cardNo: e.detail.value
    })
    console.log(res);
    if (res.code == 0) {
      that.setData({
        bankName: res.data
      })
    }
  },

  async submit(e) {
    console.log(e);
    try {
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

      let res = await Api.withdrawalAdd(data);
      console.log(res);
      if (res.code == 0) {
        that.showTips("申请成功,请耐心等待", "success");
        setTimeout(() => {
          that.back();
        }, 1500);
      } else {
        that.setData({
          disabled:false
        })
        that.showTips(res.msg);
      }
    } catch (error) {
      that.showTips(JSON.stringify(error));
      that.setData({
        disabled:false
      })
    }
  }
})