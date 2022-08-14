
const CustomPage = function (page) {
  return Page(
    Object.assign({}, page, {
      onLoad(options) {
        this.setData(
          options
        )
        page.onLoad && page.onLoad.call(this, options)
      },
      toUrl(e) {
        console.log(e)
        let url = e.currentTarget.dataset.url;
        if (url) {
          wx.navigateTo({
            url: url,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '正在开发中~',
          })
        }
      },
      back() {
        if (getCurrentPages().length > 1) {
          wx.navigateBack({
            delta: 1
          })
        }
      },
      home() {
        wx.switchTab({
          url: '/pages/index/home',
        })
      },
      showTips(msg="出错了~", type = "error") {
        this.setData({
          msg: msg,
          type: type,
          show: true
        })
      }
    })
  )
}

export default CustomPage