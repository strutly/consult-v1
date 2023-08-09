var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
import WxValidate from '../../utils/WxValidate';
CustomPage({
  data: {
    now: new Date().toLocaleDateString(),
    openIndex: 0,
    formData: {
    },
    demands:['融资需求','人才引进类','政策申报类','技术引进或转型需求'],
    followStages: ['维护', '储备', '拟服务'],
    cooperationModes: ['横向课题', '合作申报项目', '兼职顾问', '全职引进'],
    corporateHonors:['雏鹰入库','小巨人','高新企业','专精特精'],
    leaderTitles:['院士','高校教授','海外院士','专家'],
    declareTypes:['人才','科技','工信'],
    declareResults:['未通过','通过'],
    staffs:[{name:'测试',id:1}]
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
      followCenter: {
        required: true
      },
      followStage: {
        required: true,
        min: 0
      },
      demands: {
        list: true
      },
      leaderTitles: {
        list: true
      },
      leaderTitles:{
        list: true
      },
      classify: {
        required: true
      },
      regtime: {
        required: true
      },
      address: {
        required: true
      },
      talentId: {
        required: true,
        min:0
      },
      abutment: {
        required: true
      },
      servicer: {
        required: true
      },
      contactName: {
        required: true
      },
      contactPhone: {
        required: true
      },
      lastRevenue:{
        required: true
      },
      lastInvestment:{
        required: true,
        min:0
      },
      propertyNum:{
        required: true,
        min:0
      },
      abroadNum:{
        required: true,
        min:0
      },
      doctorNum:{
        required: true,
        min:0
      },
      masterNum:{
        required: true,
        min:0
      },
      artisanNum:{
        required: true,
        min:0
      }
    };
    const messages = {
      title: {
        required: "请输入企业名称"
      },
      followCenter: {
        required: "请输入跟进中心"
      },
      followStage: {
        required: "请选择跟进阶段",
        min: "请选择跟进阶段"
      },
      demands: {
        list: "企业需求请选择至少一项"
      },
      corporateHonors: {
        list: "企业荣誉请选择至少一项"
      },
      leaderTitles:{
        list: "带头人称号请选择至少一项"
      },
      classify: {
        required: "请输入行业分类"
      },
      regtime: {
        required: "请选择注册时间"
      },
      address: {
        required: "请输入企业地址"
      },
      talentId: {
        required: "请选择负责人",
        min:"请选择负责人"
      },
      abutment: {
        required: "请输入项目对接人"
      },
      servicer: {
        required: "请输入后期服务人"
      },      
      contactName: {
        required: "请输入联系人"
      },
      contactPhone: {
        required: "请输入联系电话"
      },
      lastRevenue:{
        required: "请输入上年度营收"
      },
      lastInvestment:{
        required: "请输入上年度研发投入",
        min: "请输入上年度研发投入"
      },
      propertyNum:{
        required:  "请输入知识产权数量入",
        min: "请输入知识产权数量"
      },
      abroadNum:{
        required:  "请输入留学员工人数人数",
        min: "请输入留学员工人数人数"
      },
      doctorNum:{
        required:  "请输入博士人数",
        min: "请输入博士人数"
      },
      masterNum:{
        required:  "请输入硕士人数",
        min: "请输入硕士人数"
      },
      artisanNum:{
        required:  "请输入技术人员人数",
        min: "请输入技术人员人数"
      }
    };
    that.WxValidate = new WxValidate(rules, messages);
  },
  onReady() {
    Api.talentAll().then(res=>{
      that.setData({
        talents:res.data
      })
    },err=>{
      that.showTips(err.msg);
    })
  },
  onShow() {

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
    Api.enterpriseAdd(data).then(res=>{
      console.log(res);
      that.showTips("保存成功","success");
      setTimeout(()=>{
        wx.navigateBack();
      },1500)
    },err=>{
      that.showTips(err.msg);
    })
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