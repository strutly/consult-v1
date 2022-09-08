var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  async onLoad(options){
    console.log(options);
    that = this;
    let res = await Api.expertDetail(options);
    console.log(res);
    that.setData({
      expert:res.data
    })
  }
})