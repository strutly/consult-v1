var that;
import Api from "../../config/api";
import CustomPage from '../../CustomPage';
CustomPage({ 
  data: {

  },  
  async onLoad(options) {
    that = this;
    let res = await Api.userAdminInfo({1:1});
    that.setData({
      info:res.data
    })
  }
})