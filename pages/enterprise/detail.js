var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
CustomPage({
  data: {
    showIndex: 0,
    navs: ['企业介绍', '访问记录', '企业需求', '企业运营情况'],
    demands:['融资需求','人才引进类','政策申报类','技术引进或转型需求','无'],
    followStages: ['维护', '储备', '拟服务'],
    cooperationModes: ['横向课题', '合作申报项目', '兼职顾问', '全职引进'],
    corporateHonors:['雏鹰入库','小巨人','高新企业','专精特精','独角兽','科小','瞪羚','无'],
    leaderTitles:['院士','高校教授','海外院士','专家'],
    declareTypes:['人才','科技','工信'],
    declareResults:['未通过','通过'],
    enterprise: {}
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
    
    Api.enterpriseUpdate({
      id: that.data.options.id,
      ...data
    }).then(res => {
      that.showTips("修改成功", "success");
      that.setData({
        modalUpdate: false,
        enterprise: { ...enterprise, ...data }
      })
    }, err => {
      that.showTips(err.msg);
    })
    
  }
})