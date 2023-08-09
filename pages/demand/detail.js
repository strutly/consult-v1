var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    demand:{},
    types: ['请选择咨询方式', '线上会议', '线下面谈'],
  },
  onLoad(options) {
    that = this;
    Api.demandDetail({
      id:options.id
    }).then(res=>{
      that.setData({
        demand:res.data
      })
    },err=>{
      that.showTips(err.msg);
    });
  },

  
})