var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
import WxValidate from '../../utils/WxValidate';
CustomPage({
  data: {
    now: new Date().toLocaleDateString(),
    openIndex: 0,
    formData: {
      hasEntrepreneurshipFundSupport:1
    },
    enterpriseNatures: ['新成立公司', '老公司迁入']
  },
  onLoad(options) {
    that = this;
    that.initValidate();
  },

  initValidate() {
    const rules = {
      projectName: {
        required: true
      },
      contactPerson: {
        required: true
      },
      position: {
        required: true
      },
      contactInfo: {
        list: true
      },
      projectSource: {
        list: true
      },
      enterpriseNature: {
        list: true
      },
      enterpriseCategory: {
        required: true
      },
      projectBriefIntroduction: {
        required: true
      },
      mainBusiness: {
        required: true
      },
      officeAddress: {
        required: true
      },
      mainCompetitiveness: {
        required: true
      },
      teamComposition: {
        required: true
      },
      cooperationIntent: {
        required: true
      },
      projectTimePlan: {
        required: true
      }
    };
    const messages = {
      projectName: {
        required: "请输入项目名称"
      },
      contactPerson: {
        required: "请输入联系人"
      },
      position: {
        required: "请输入职务"
      },
      contactInfo: {
        list: "请输入联系方式"
      },
      projectSource: {
        list: "请输入项目来源"
      },
      enterpriseNature: {
        list: "请选择企业性质"
      },
      enterpriseCategory: {
        required: "请输入企业类别"
      },
      projectBriefIntroduction: {
        required: "请输入项目简要介绍"
      },
      mainBusiness: {
        required: "请输入主营业务"
      },
      officeAddress: {
        required: "请输入办公地址"
      },
      mainCompetitiveness: {
        required: "请输入主要竞争力"
      },
      teamComposition: {
        required: "请输入团队组成情况"
      },
      cooperationIntent: {
        required: "请输入合作意向"
      },
      projectTimePlan: {
        required: "请输入项目时间计划"
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  onShow() {

  },
  onReady(){
    if(that.data.options.id){
      Api.enterpriseProjectDetail(that.data.options).then(res=>{
        console.log(res);
        that.setData({
          formData:res.data
        })
      },err=>{
        console.log(err)
      })
    }
  },
  switchChange(e) {
    console.log(e);
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let formData = that.data.formData;
    if(name=="hasEntrepreneurshipFundSupport"&&!value){
      formData.policySupportSource = "";
    }
    formData[name] = value?1:0;
    that.setData({
      formData:formData
    })
  },
  checkBoxChange(e){
    let sourceFrom = ['外资', '国家', '江苏省'];
    let formData = that.data.formData;
    let policySupportSource = formData.policySupportSource.split(/[^a-zA-Z0-9\u4e00-\u9fa5]/g).filter(s=>{
      return s && sourceFrom.indexOf(s)==-1;
    })
    console.log(policySupportSource)
    let value = e.detail.value;
    formData.policySupportSource = value.concat(policySupportSource).join(",");
    that.setData({
      formData:formData
    })
    console.log(e)
  },
  otherChange(e){
    let sourceFrom = ['外资', '国家', '江苏省'];
    console.log(e);
    let value = e.detail.value;
    let formData = that.data.formData;
    let policySupportSource = formData.policySupportSource.split(/[^a-zA-Z0-9\u4e00-\u9fa5]/g).filter(s=>{
      return s && sourceFrom.indexOf(s)>-1;
    })
    formData.policySupportSource = value.split(/[^a-zA-Z0-9\u4e00-\u9fa5]/g).concat(policySupportSource).join(",");
    that.setData({
      formData:formData
    })
  },
  pickerChange(e) {
    let name = e.currentTarget.dataset.name;
    that.setData({
      ['formData.' + name]: e.detail.value
    })
  },
  submit(e) {
    console.log(e);
    let data = e.detail.value;
    if (!that.WxValidate.checkForm(data)) {
      console.log(that.WxValidate)
      let error = that.WxValidate.errorList[0]
      return that.showTips(error.msg);
    }
    if(data.id){
      Api.enterpriseProjectUpdate(data).then(res=>{
        console.log(res);
        that.showTips("保存成功", "success");
        setTimeout(() => {
          wx.navigateBack();
        }, 1500)
      },err=>{
        that.showTips(err.msg);
      })
    }else{
      delete data.id;
      Api.enterpriseProjectAdd(data).then(res => {
        console.log(res);
        that.showTips("保存成功", "success");
        setTimeout(() => {
          wx.navigateBack();
        }, 1500)
      }, err => {
        that.showTips(err.msg);
      })
    }
    
  },
  open(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let openIndex = that.data.openIndex;
    if (index == openIndex) {
      index = -1;
    }
    that.setData({
      openIndex: index
    })
  }
})