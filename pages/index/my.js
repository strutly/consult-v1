import CustomPage from '../../CustomPage';
var that;
CustomPage({
  onLoad(options){
    console.log(options);
    that = this;
  }
})
