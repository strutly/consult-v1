var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    notice:{}
  },
  async onLoad(options) {
    that = this;
    let res = await Api.noticeDetail({
      id:options.id
    });
    let notice = res.data;
    notice.content = notice.content.replace(/<img/g, `<img style="max-width:100%;"`);
    that.setData({
      notice:notice
    })
  }

  
})