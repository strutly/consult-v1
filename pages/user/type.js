import CustomPage from '../../CustomPage';
var that;
CustomPage({
  data: {
    countdown:"获取验证码"
  },
  onLoad(options){
    console.log(options);
    that = this;    
    

  }
})
