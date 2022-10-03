var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    demand:[]
  },

  onLoad(options){
    console.log(options);
    that = this;
    that.getList(1);
  },
  onShow(){
    that.setData({
      userInfo:wx.getStorageSync('userInfo')||{}
    })
  },
  async getList(pageNum){
    try {
      let res = await Api.demandPage({
        pageNum:pageNum,
        pageSize:6
      });
      console.log(res);
      let demand = that.data.demand||[];    
      demand = demand.concat(res.data.content);
      that.setData({
        pageNum:pageNum,
        endline: res.data.last,
        demand:demand      
      });
    } catch (error) {
      console.log(error)
    }    
  },
  
  onReachBottom(){
    let endline = that.data.endline;
    if(!endline){
      let pageNum = that.data.pageNum + 1;
      that.getList(pageNum);
    }    
  }  
})