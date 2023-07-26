var that, timerId;
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
      enterpriseId: {
        required: true
      },
      names: {
        required: true
      },
      state: {
        required: true
      },
      visiteTime: {
        required: true
      },
      contactPerson: {
        required: true
      },
      appeal: {
        required: true
      },
      feedback: {
        required: true
      },
      result: {
        required: true
      }
    };
    const messages = {
      enterpriseId: {
        required: "请输入企业名称并选择"
      },
      names: {
        required: "请输入走访人"
      },
      state: {
        required: "请输入走访阶段"
      },
      visiteTime: {
        required: "请选择走访时间"
      },
      contactPerson: {
        required: "请输入对接人"
      },
      appeal: {
        required: "请输入企业诉求"
      },
      feedback: {
        required: "请输入反馈"
      },
      result: {
        required: "请输入结果"
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  titleChange(e) {
    console.log(e);
    let title = e.detail.value;
    if (timerId) clearTimeout(timerId);
    //实现防抖  
    if (title) {
      timerId = setTimeout(() => {
        Api.enterprisePage({ title: title }).then(res => {
          console.log(res)
          that.setData({
            mask: res.data.content.length > 0,
            enterprises: res.data.content
          })
        }, err => {

        });
      }, 300);
    } else {
      that.setData({
        mask: false,
        enterprises: []
      })
    }
  },
  choose(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let enterprises = that.data.enterprises;
    that.setData({
      mask:false,
      enterprise:enterprises[index]
    })
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
      disabled:true
    })
    Api.followAdd(data).then(res=>{
      that.showTips("新增成功","success");
      setTimeout(() => {
        wx.navigateBack()
      }, 1500);
    },err=>{
      that.setData({
        disabled:false
      })
      that.showTips(err.msg);
    })

  }
})