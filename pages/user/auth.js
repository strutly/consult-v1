
var that;
import Api from "../../config/api";
import CustomPage from '../../CustomPage';
import WxValidate from "../../utils/WxValidate";
CustomPage({
  data: {
    reg: {},
    statusMsg:['提交','已通过','已拒绝']
  },
  async onLoad(options) {
    console.log(options);
    that = this;
    let res = await Api.getUserReg();
    console.log(res);
    let reg = res.data;
    let disabled = false;
    if(reg.regStatus==1){
      disabled = true;
    }
    that.setData({
      reg: reg,
      disabled:disabled
    });
    that.initValidate();
  },
  initValidate() {
    const rules = {
      name: {
        required: true
      },
      country: {
        required: true
      },
      unit: {
        required: true
      },
      post: {
        required: true
      },
      education: {
        required: true
      },
      goodAt: {
        required: true
      },
      introduce: {
        required: true,
        minlength: 50
      },
      certificate: {
        required: true
      }
    }, messages = {
      name: {
        required: "请输入您的姓名"
      },
      country: {
        required: "请输入您的国家/地区"
      },
      unit: {
        required: "请输入您的工作单位"
      },
      post: {
        required: "请输入您的工作职务"
      },
      education: {
        required: "请输入您的学历"
      },
      goodAt: {
        required: "请输入您的擅长领域"
      },
      introduce: {
        required: "请输入您的个人介绍",
        minlength: "个人介绍不能少于50字符"
      },
      certificate: {
        required: "请上传您的学历学位证书",
      }

    }
    that.WxValidate = new WxValidate(rules, messages);
  },

  async upload() {
    let fileRes = await wx.chooseMessageFile({
      count: 1,
      type: 'all'
    });
    let types = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff', 'pdf'];
    var filename = fileRes.tempFiles[0].name;
    let fileType = filename.substr(filename.lastIndexOf('.') + 1);
    let index = types.indexOf(fileType.toLowerCase());
    if (index == -1) {
      wx.showToast({
        icon: 'none',
        title: '请上传图片或者PDF形式附件'
      })
    } else {
      let flag = true;
      if (index == types.length - 1) flag = false;
      let res = await Api.uploadFile(fileRes.tempFiles[0].path, flag);
      console.log(res);
      if (res.code == 0) {
        that.setData({
          ['reg.certificate']: res.data
        })
      } else {
        that.showTips(res.msg, "error");
      }
    }
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
    if (data.id) {
      res = await Api.updateUserReg(data);
    } else {
      res = await Api.addUserReg(data);
    };
    console.log(res);
    if (res.code == 0) {
      that.showTips("提交成功,请耐心等待审核", "success");
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 2000);
    } else {
      that.showTips(res.msg || "出错了", "error");
    }
  }
})
