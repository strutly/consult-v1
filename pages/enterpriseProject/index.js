var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
CustomPage({
  data: {
    enterpriseProjects: [],
    addModal: false,
    followStages: ['维护', '储备', '拟服务'],
    demands:['融资需求','人才引进类','政策申报类','技术引进或转型需求'],
    corporateHonors:['雏鹰入库','小巨人','高薪产业','专精特精'],
    leaderTitles:['院士','高校教授','海外院士','专家']
  },
  onLoad(options) {
    that = this;
    that.getPage({}, 1);
  },
  onReady() {

  },
  onShow() {

  },
  getPage(params={}, pageNum=1) {
    Api.enterpriseProjectPage({ ...params, pageNum: pageNum }).then(res => {
      console.log(res);
      let enterpriseProjects = that.data.enterpriseProjects||[];
      that.setData({
        params:params,
        pageNum:pageNum,
        enterpriseProjects:enterpriseProjects.concat(res.data.content),
        endline: res.data.last
      })
    }, err => {
      that.showTips(err.msg);
    });
  },
  onReachBottom() {
    let endline = that.data.endline;
    if (!endline) {
      let pageNum = that.data.pageNum + 1;
      let params = that.data.params;
      that.getPage(params, pageNum);
    }
  },
  add() {
    that.setData({
      addModal: true
    });
    setTimeout(() => {
      that.setData({
        addModal: false
      })
    }, 2000)
  },
  checkboxChange(e){
    let name = e.currentTarget.dataset.name;
    that.setData({
      ['params.' + name]: e.detail.value
    })
  },
  search(){
    that.setData({
      enterpriseProjects:[],
      modalfilter:false
    })
    that.getPage(that.data.params,1);
  }
})