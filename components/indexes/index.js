import countryData from '../../utils/countryData';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    countryModal:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    keys:["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    countryData:countryData,
    listCurID:'a'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    search(e){
      console.log(e)
      let v = e.detail.value;
      if(v){
        let c = {};
        countryData.forEach(item=>{
          item.country.forEach(country=>{
            if(country.CNName.indexOf(v)>-1 || country.name.indexOf(v)>-1){
                if(!c[item.code]){
                  c[item.code] = [];
                }
                c[item.code].push(country);
            }
          })
        })
        let cos = [];
        let keys = Object.keys(c).sort()
        keys.forEach(item=>{
          cos.push({
            code:item,
            country:c[item],
            
          })
        })
        this.setData({
          countryData:cos,
          listCurID:keys[0],
          keys:keys
        })
      }else{
        this.setData({
          countryData:countryData,
          listCurID:'a',
          keys:["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        })
      }
    },
    chooseCountry(e){
      console.log(e);
      let name = e.currentTarget.dataset.name;
      this.triggerEvent('myevent',{name:name})
    },
    moveIndex(e){
      console.log(e);
      this.setData({
        listCurID:e.currentTarget.id
      })
    }
  }
})
