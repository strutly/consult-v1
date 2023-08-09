var that;
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    countdown:"获取验证码"
  },
  onLoad(options){
    console.log(options);
    that = this;
  }
})
