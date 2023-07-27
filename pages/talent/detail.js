var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data:{
    areas:['未知','集成电路','物联网','人工智能','智能制造','新材料','生物医药','医疗器械','节能环保','新能源','汽车零部件','大数据','化学化工']
  },
  async onLoad(options){
    console.log(options);
    that = this;
    let res = await Api.talentDetail(options);
    console.log(res);
    that.setData({
      talent:res.data
    })
  },
  onShow(){
    that.setData({
      userInfo:wx.getStorageSync('userInfo')||{}
    })
  }
})