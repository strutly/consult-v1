var that;
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    types:['请选择问题类型','视频会议','线下交流'],    
    formData:{
      type:0
    },
    minDate:new Date().toLocaleDateString()
  },
  onLoad(options){
    that = this;
    console.log(options);
  },
  pickerChange(e){
    console.log(e);
    let name = e.currentTarget.dataset.name;
    that.setData({
      ['formData.'+name]:e.detail.value
    })
  },
})
