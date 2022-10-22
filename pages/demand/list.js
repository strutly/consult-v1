var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    demands:[],
    editIndex:-1
  },

  onLoad(options){
    console.log(options);
    that = this;
    that.setData({
      demands:[]
    })
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
      let demands = that.data.demands||[];    
      demands = demands.concat(res.data.content);
      that.setData({
        pageNum:pageNum,
        endline: res.data.last,
        demands:demands      
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
  },
  openEdit(e){
    let index = e.currentTarget.dataset.index;
    let editIndex = that.data.editIndex;
    if(index==editIndex) index = -1;
    that.setData({
      editIndex:index
    })
  },
  delete(e){
    console.log(e)
    let index = e.currentTarget.dataset.index;

    let demands = that.data.demands;
    wx.showModal({
      title: '提示',
      content: '您确认删除此需求吗?',
      async success(confirm) {
        console.log(confirm);
        if (confirm.confirm) {
          let res = await Api.demandDelete(demands[index].id);
          if(res.code==0){
            demands.splice(index,1);
            console.log(demands);
            that.showTips("操作成功",'success');
            that.setData({
              demands:demands
            })  
          }else{
            that.showTips(res.msg);
          }                  
        }
      },
      complete(){
        that.setData({
          editIndex:-1
        })
      }
    })
  },
  edit(e){    
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      success(res){
        that.setData({
          editIndex:-1
        });
      }
    })
  }  
})