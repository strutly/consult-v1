var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  onLoad(options){
    console.log(options);
    that = this;
    that.roundList(1);
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
    let totalPages = that.data.totalPages;
    let pageNum = Math.floor(Math.random()*totalPages+1);
    that.roundList(pageNum);
  }
})