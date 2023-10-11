var that;
var app = getApp();
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
CustomPage({
  data: {
    showIndex: 0,
    navs: ['企业介绍', '访问记录', '企业需求', '企业运营情况','企业领军人','企业驻地信息','企业政策申报情况'],
    demands:['融资需求','人才引进类','政策申报类','技术引进或转型需求','无'],
    followStages: ['维护', '储备', '拟服务'],
    cooperationModes: ['横向课题', '合作申报项目', '兼职顾问', '全职引进'],
    corporateHonors:['雏鹰入库','小巨人','高新企业','专精特精','独角兽','科小','瞪羚','无'],
    leaderTitles:['院士','高校教授','海外院士','专家'],
    declareTypes:['人才','科技','工信'],
    declareResults:['未通过','通过'],
    enterprise: {},
    screenWidth:app.globalData.screenWidth,
    scrollLeft:0,
    moveLeft:false,
    moveRight:true,
    scrollWidth:1000
  },

  onLoad(options) {
    that = this;
  },

  onReady() {
    Api.enterpriseDetail({ id: that.data.options.id }).then(res => {
      console.log(res);
      that.setData({
        enterprise: res.data
      })
      that.pageFollow(1);
    }, err => {
      that.showTips(err.msg);
    });
  },
  pageFollow(pageNum) {
    Api.followPage({
      enterpriseId: that.data.options.id,
      pageNum: pageNum
    }).then(res => {
      let follows = that.data.follows || [];
      that.setData({
        pageNum: pageNum,
        follows: follows.concat(res.data.content),
        endline: res.data.last
      })
    }, err => { })
  },
  navChange(e) {
    console.log(e);
    let showIndex = that.data.showIndex;
    let index = e.currentTarget.dataset.index;
    if (showIndex == index) return;
    that.setData({
      showIndex: index
    })
  },
  navScroll(e){
    let screenWidth = that.data.screenWidth;
    that.setData({
      scrollLeft:e.detail.scrollLeft,
      moveLeft:e.detail.scrollLeft>0,
      moveRight:(screenWidth+e.detail.scrollLeft)<(e.detail.scrollWidth-10),
      scrollWidth:e.detail.scrollWidth
    })
  },
  onShow() {

  },
  onHide() {

  },
  onReachBottom() {
    let endline = that.data.endline;
    if (!endline) {
      let pageNum = that.data.pageNum + 1;
      that.pageFollow(pageNum);
    }
  },
  update(e) {
    console.log(e);
    that.setData({
      modalType: e.currentTarget.dataset.type,
      modalUpdate: true
    })
  },
  pickerChange(e) {
    let name = e.currentTarget.dataset.name;
    that.setData({
      ['enterprise.' + name]: e.detail.value
    })
  },
  submit(e) {
    console.log(e);
    let data = e.detail.value;
    let enterprise = that.data.enterprise;
    let newd =  { ...enterprise, ...data }
    console.log(newd)    
    Api.enterpriseUpdate(data).then(res => {
      that.showTips("修改成功", "success");
      that.setData({
        modalUpdate: false,
        enterprise: newd
      })
    }, err => {
      that.showTips(err.msg);
    })    
  },
  declarationUpdate(e){
    console.log(e);
    let enterprise = that.data.enterprise;
    let index = e.currentTarget.dataset.index;
    let declaration = enterprise.declarations[index];
    that.setData({
      declaration:{...declaration,index},
      modalDeclaration:true
    })
  },
  declarationSubmit(e){
    let data = e.detail.value;
    console.log(e);
    let enterprise = that.data.enterprise;
    let index = data.index;
    enterprise.declarations[index] = data;
    Api.enterpriseUpdate(enterprise).then(res => {
      that.showTips("修改成功", "success");
      that.setData({
        modalDeclaration: false,
        enterprise: enterprise
      })
    }, err => {
      that.showTips(err.msg);
    })
  }
})