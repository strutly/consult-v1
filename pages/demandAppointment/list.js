var that;
import Api from "../../config/api";
import CustomPage from '../../CustomPage';

CustomPage({
  data: {
    index: 1,
    types: ['未选择', '视频会议', '线下交流'],
    status: [
      { type: 0, title: "待审核" },
      { type: 1, title: "审核通过" },
      { type: 2, title: "审核失败" },
      { type: 3, title: "预约失效" },
      { type: 4, title: "预约成功" },      
      { type: 5, title: "咨询进行中" },
      { type: 6, title: "咨询结束" },
      { type: 7, title: "咨询完成" }],
    bgs: ['blue','grey', 'green', 'cyan', 'purple','orange','pink','red'],
    appointments: [],
    pageNo: 1,
    endline: false
  },
  onLoad(options) {
    console.log(2)
    that = this;
    that.getList(1);
  },
  getList(pageNo) {
    let param = { pageNum: pageNo };
    let status = that.data.options.status
    if (status) {
      param.status = status;
    }
    Api.pageDemandAppointment(param).then(res=>{
      console.log(res);
      let appointments = that.data.appointments;
      that.setData({
        pageNo: pageNo,
        endline: res.data.last,
        appointments: appointments.concat(res.data.content)
      });
    },err=>{
      that.showTips(err.msg);
    });
    
  },
  tabSelect(e) {
    console.log(e);
    let index = e.currentTarget.dataset.mine;
    if (that.data.index == index) return;
    that.setData({
      index: index
    })
    if (!that.data.pageNo[index]) {
      that.getList(index, 1);
    }
  },
  onReachBottom() {
    let endline = that.data.endline;
    if (!endline) {
      let pageNo = that.data.pageNo + 1;
      that.getList(pageNo);
    }
  },
  open(e) {
    let index = e.currentTarget.dataset.index;
    let open = that.data.open;
    if (open == index) {
      index = null;
    }
    that.setData({
      open: index
    })
  },
  showModal(e) {
    console.log(e)
    that.setData({
      formData: e.currentTarget.dataset
    })
    that.modal();
  },
  modal() {
    that.setData({
      modal: !that.data.modal
    })
  },
  submit() {
    let formData = that.data.formData;
    Api.updateDemandAppointment(JSON.stringify(formData)).then(res=>{
      console.log(res);
      that.setData({
        appointments: []
      })
      that.getList(1);
      that.showTips("操作成功!", "success");
      that.modal();
    },err=>{
      that.showTips(err.msg);
    });
  },
  copy(e) {
    console.log(e.currentTarget.dataset.text)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.showToast({
          icon: 'none',
          title: '会议号复制成功'
        })
      }
    })
  }
})