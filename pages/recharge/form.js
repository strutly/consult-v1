var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    disabled:false,
    index:-1,
    total:"",
    otherPrice:false,
    prices:[{
      title:"充￥100",
      total:100,
      otherPrice:false
    },{
      title:"充￥200",
      total:200,
      otherPrice:false
    },{
      title:"充￥500",
      total:500,
      otherPrice:false
    },{
      title:"充￥1000",
      total:1000,
      otherPrice:false
    },{
      title:"充￥2000",
      total:2000,
      otherPrice:false
    },{
      title:"其他金额",
      total:'',
      otherPrice:true
    },]
  },

  onLoad(options) {
    that = this;
  },
  choosePrice(e){
    console.log(e)
    that.setData(e.currentTarget.dataset)
  },


  totalChange(e){
    console.log(e);
    let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    let total = e.detail.value;
    console.log(reg.test(total))
    if(!reg.test(total)){
      that.setData({
        total:""
      })
      that.showTips("金额单位错误,已重置")
    }
  },
  async submit(e){
    console.log(e)
    let total = e.detail.value.total
    if(!total) return that.showTips("请选择充值金额");
    that.setData({
      disabled:true
    })
    let res = await Api.recharge({
      total:total
    })
    console.log(res);
    try {
      if(res.code==0){
        let payRes = await wx.requestPayment({
          timeStamp: res.data.timeStamp + "",
          nonceStr: res.data.nonceStr,
          package: res.data.packageValue,
          signType: res.data.signType + "",
          paySign: res.data.paySign
        })
        console.log(payRes)
        if(payRes.errMsg=="requestPayment:ok"){
          that.showTips("支付成功~","success");
          setTimeout(() => {
            that.back()
          }, 1500);
        }else{
          that.showTips(payRes.errMsg);
        }
      }else{
        that.setData({
          disabled:false
        })
        that.showTips(res.msg);
      } 
    } catch (error) {
      that.setData({
        disabled:false
      })
      that.showTips(error.msg);
    }       
  } 
})