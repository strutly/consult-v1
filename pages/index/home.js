var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data:{
    areas:['未知','集成电路','物联网','人工智能','智能制造','新材料','生物医药','医疗器械','节能环保','新能源','汽车零部件','大数据','化学化工'],
  },
  onLoad(options){
    console.log(options);
    that = this;
    console.log(1);
  },
  onReady(){
    getApp().watch(function (value) {
      if(value){
        that.roundList(1);
      }
    })
  },
  async roundList(pageNum){
    let res = await Api.expertPage({
      pageNum:pageNum,
      pageSize:2
    });
    console.log(res);
    that.setData({
      totalPages:res.data.totalPages,
      experts:res.data.content
    })
  },
  refresh(){
    let totalPages = that.data.totalPages||0;
    let pageNum = Math.floor(Math.random()*totalPages+1);
    that.roundList(pageNum);
  }
})