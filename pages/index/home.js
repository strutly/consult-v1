var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data:{
    areas:['未知','集成电路','物联网','人工智能','智能制造','新材料','生物医药','医疗器械','节能环保','新能源','汽车零部件','大数据','化学化工'],
    notices:[{
      id:"",
      pic: 'https://gridpic.tsing-tec.com/consult/635647ad5c47da0f717bdd9f.jpg'
    }],
    current:0,
    autoplay:true
  },
  onLoad(options){
    that = this;
    
  },
  onShow(){
    console.log(1);
    getApp().watch(function (value) {
      if(value){
        that.roundList(1);
        that.noticeList();        
      }
    })
    that.setData({
      autoplay:true
    })
  },
  async noticeList(){
    let res = await Api.noticePage({
      pageNum:1,
      pageSize:5
    });
    let notices = [{
      id:"",
      pic: 'http://gridpic.tsing-tec.com/consult/635647ad5c47da0f717bdd9f.jpg'
    }];
    that.setData({
      notices:notices.concat(res.data.content)
    })
  },
  async roundList(pageNum){
    try {
      let res = await Api.expertPage({
        pageNum:pageNum,
        pageSize:2
      });
      console.log(res);
      that.setData({
        totalPages:res.data.totalPages,
        experts:res.data.content
      })
    } catch (error) {
      console.log(error) 
    }    
  },
  refresh(){
    let totalPages = that.data.totalPages||0;
    let pageNum = Math.floor(Math.random()*totalPages+1);
    that.roundList(pageNum);
  },
  dotsChange(e){
    console.log(e);
    that.setData({
      current:e.detail.current
    })
  },
  onHide(){
    console.log("hide")
    that.setData({
      autoplay:false
    })
  }
})