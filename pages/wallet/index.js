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
  async onShow(){
    let res = await Api.userAdminBalance();
    console.log(res);
    that.setData({
      balance:res.data
    })


  }

  
})