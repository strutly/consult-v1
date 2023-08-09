// pages/wallet/rechage.js
var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    open: -1,
    moneyRecords: []
  },
  onLoad(options) {
    that = this;
    that.getList(1);
  },

  async getList(pageNo) {
    Api.withdrawalPage({ pageNum: pageNo, pageSize: 10 }).then(res => {
      console.log(res);
      let moneyRecords = that.data.moneyRecords;
      that.setData({
        pageNo: pageNo,
        endline: res.data.last,
        moneyRecords: moneyRecords.concat(res.data.content)
      });
    }, err => {
      console.log(err);
    });

  },
  open(e) {
    console.log(e)
    let open = that.data.open;
    let id = e.currentTarget.dataset.id;
    if (id == open) id = -1;
    that.setData({
      open: id
    })
  },

  onReachBottom() {
    console.log("下滑")
    let endline = that.data.endline;
    if (!endline) {
      let pageNo = that.data.pageNo + 1;
      that.getList(pageNo);
    }
  },
})