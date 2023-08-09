var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    balance:{
      balance:'0.00',
      total:'0.00',
      frozenAmount:'0.00'
    }
  },
  onLoad(options) {
    that = this;
  },
  onShow(){
    Api.userAdminBalance().then(res=>{
      console.log(res);
      that.setData({
        balance:res.data
      })
    },err=>{
      console.log(err);
    });
  }  
})