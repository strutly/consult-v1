
var that;
import Api from "../../config/api";
import CustomPage from '../../CustomPage';
import WxValidate from "../../utils/WxValidate";
CustomPage({
  data: {
    reg: {},
    areas: ['请选择擅长领域', '集成电路', '物联网', '人工智能', '智能制造', '新材料', '生物医药', '医疗器械', '节能环保', '新能源', '汽车零部件', '大数据', '化学化工'],
    statusMsg: ['提交', '已通过', '已拒绝'],
    modalreg: true
  },
  async onLoad(options) {
    console.log(options);
    that = this;
    that.initValidate();
  },
  onReady() {
    Api.getUserReg().then(res => {
      let reg = res.data || {};
      that.setData({
        reg: reg,
        keys: (reg.keyword || "").split(",")
      });
    }, err => {
      console.log(err);
    });
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
      field: {
        required: true,
        min: 1
      },
      'key[0]': {
        required: true
      },
      introduce: {
        required: true,
        minlength: 50
      },
      industrialize: {
        required: true
      },
      achievement: {
        required: true
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
      field: {
        required: "请选择您的擅长领域",
        min: "请选择您的擅长领域"
      },
      'key[0]': {
        required: "请至少输入一个技术关键词"
      },
      introduce: {
        required: "请输入您的个人介绍",
        minlength: "个人介绍不能少于50字符"
      },
      industrialize: {
        required: "请输入您的产业化经历"
      },
      achievement: {
        required: "请输入您的个人成就",
      },
      certificate: {
        required: "请上传您的学历学位证书"
      }

    }
    that.WxValidate = new WxValidate(rules, messages);
  },
  areaChange(e) {
    that.setData({
      areaIndex: e.detail.value
    })
  },
  async upload() {
    wx.chooseMessageFile({
      count: 1,
      type: 'all'
    }).then(fileRes => {
      let types = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff', 'pdf'];
      var filename = fileRes.tempFiles[0].name;
      let fileType = filename.substr(filename.lastIndexOf('.') + 1);
      let index = types.indexOf(fileType.toLowerCase());
      if (index == -1) {
        wx.showToast({
          icon: 'none',
          title: '请上传图片或者PDF形式附件'
        })
        return;
      }
      let flag = true;
      if (index == types.length - 1) flag = false;
      Api.uploadFile(fileRes.tempFiles[0].path, flag).then(res => {
        that.setData({
          ['reg.certificate']: res.data
        })
      }, err => {
        that.showTips(err.msg, "error");
      });
    }, cancel => {
      console.log(cancel)
    });
  },
  keyChange(e) {
    let index = e.currentTarget.dataset.index;
    let keys = that.data.keys;
    keys[index] = e.detail.value;
    that.setData({
      keys: keys
    })
  },
  chooseCountry(e) {
    that.setData({
      ['reg.country']: e.detail.name
    });
    that.countryModal();
  },
  countryModal() {
    that.setData({
      countryModal: !that.data.countryModal
    })
  },
  authModal() {
    that.setData({
      authModal: !that.data.authModal
    })
  },
  submit(e) {
    console.log(e);
    if (!that.WxValidate.checkForm(e.detail.value)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      that.showTips(error.msg)
      return false;
    }
    that.authModal();
    that.yes = async () => {
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
    };




  }
})
