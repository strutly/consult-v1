var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    demand:{},
    types: ['请选择咨询方式', '线上会议', '线下面谈'],
  },

  async onLoad(options) {
    that = this;
    let res = await Api.demandDetail({
      id:options.id
    });
    console.log(res);
    that.setData({
      demand:res.data
    })
  },

  
})