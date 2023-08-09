var that;
import Api from "../../config/api";
import CustomPage from '../../CustomPage';
CustomPage({ 
  data: {
    info:{}
  },  
  async onLoad(options) {
    that = this;
  },
  onReady(){
    Api.userAdminInfo({1:1}).then(res=>{
      that.setData({
        info:res.data
      })
    },err=>{
      console.log(err);
    });
  }
})