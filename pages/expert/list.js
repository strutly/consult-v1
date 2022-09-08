var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  onLoad(options){
    console.log(options);
    that = this;
    that.getList('',1);
  },
  async getList(name,pageNum){
    let res = await Api.expertPage({
      pageNum:pageNum,
      name:name,
      pageSize:6
    });
    let experts = that.data.experts||[];    
    experts = experts.concat(res.data.content);
    that.setData({
      pageNum:pageNum,
      name:name,
      endline: res.data.last,
      experts:experts      
    });
  },
  search(e){
    console.log(e);
    let value = e.detail.value;
    that.setData({
      experts:[],
      name:value
    });
    that.getList(value,1);
  },
  onReachBottom(){
    let endline = that.data.endline;
    if(!endline){
      let pageNum = that.data.pageNum + 1;
      let name = that.data.name;
      that.getList(name,pageNum);
    }    
  }
})