var that;
import CustomPage from '../../CustomPage';
import Api from '../../config/api';
CustomPage({
  data: {
    follow:{}
  },
  onLoad(options) {
    that = this;
  },
  onReady() {
    Api.projectFollowDetail({
      id: that.data.options.id
    }).then(res => {
      that.setData({
        follow: res.data
      })
    }, err => {
      that.showTips(err.msg);
    })
  },
  onShow() {

  },
})