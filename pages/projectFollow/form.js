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
      projectId: {
        required: true
      },
      names: {
        required: true
      },
     
      visiteTime: {
        required: true
      },
      problem: {
        required: true
      },
      handMethod: {
        required: true
      }
    };
    const messages = {
      projectId: {
        required: "请输入项目名称并选择"
      },
      names: {
        required: "请输入跟进人员"
      },
     
      visiteTime: {
        required: "请选择沟通时间"
      },
      problem: {
        required: "请输入项目发展近况与问题"
      },
      handMethod: {
        required: "请输入跟进人意见、处理方式"
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
        Api.enterpriseProjectPage({ projectName: title }).then(res => {
          console.log(res)
          that.setData({
            mask: res.data.content.length > 0,
            enterpriseProjects: res.data.content
          })
        }, err => {
          console.log(err)
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
    let enterpriseProjects = that.data.enterpriseProjects;
    that.setData({
      mask:false,
      enterpriseProject:enterpriseProjects[index]
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
    Api.projectFollowAdd(data).then(res=>{
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