var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data:{
    areas:['未知','集成电路','物联网','人工智能','智能制造','新材料','生物医药','医疗器械','节能环保','新能源','汽车零部件','大数据','化学化工']
  },
  onLoad(options){
    console.log(options);
    that = this;
  },
  onReady(){
    Api.talentDetail(that.data.options).then(res=>{
      console.log(res);
      that.setData({
        talent:res.data
      })
    },err=>{
      console.log(err)
    });
  },
  onShow(){
    that.setData({
      userInfo:wx.getStorageSync('userInfo')||{}
    })
  }
})