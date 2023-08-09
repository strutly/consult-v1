var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    areas: ['未知', '集成电路', '物联网', '人工智能', '智能制造', '新材料', '生物医药', '医疗器械', '节能环保', '新能源', '汽车零部件', '大数据', '化学化工']
  },
  onLoad(options) {
    console.log(options);
    that = this;
    that.getList('', 1);
  },
  onShow() {
    that.setData({
      userInfo: wx.getStorageSync('userInfo') || {}
    })
  },
  getList(name, pageNum) {
    Api.talentPage({
      pageNum: pageNum,
      name: name,
      pageSize: 6
    }).then(res => {
      let talents = that.data.talents || [];
      that.setData({
        pageNum: pageNum,
        name: name,
        endline: res.data.last,
        talents: talents.concat(res.data.content)
      });
    }, err => {
      console.log(err)
    });
  },
  search(e) {
    console.log(e);
    let value = e.detail.value;
    that.setData({
      talents: [],
      name: value
    });
    that.getList(value, 1);
  },
  onReachBottom() {
    let endline = that.data.endline;
    if (!endline) {
      let pageNum = that.data.pageNum + 1;
      let name = that.data.name;
      that.getList(name, pageNum);
    }
  }
})