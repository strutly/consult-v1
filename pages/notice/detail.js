var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    notice:{}
  },
  onLoad(options) {
    that = this;
    Api.noticeDetail({
      id:options.id
    }).then(res=>{
      let notice = res.data;
      notice.content = notice.content.replace(/<img/g, `<img style="max-width:100%;"`);
      that.setData({
        notice:notice
      })
    },err=>{
      console.log(err.msg);
    });    
  }

  
})