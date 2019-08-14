// components/epsoide/epsoide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      indexYear:{
        type:String,
        value:'',
        observer:function(newVal,oldVal,changedPath){
          let val =newVal<10?'0'+newVal:newVal;
          //按理来说页面显示是08，但是页面显示是8，怀疑小程序number型会强制转换为数字，所以显示是8
          //更改type类型为String，导致无线递归调用，内存泄露
          //observer 是监听到indexYear 的值改变就会调用,所以在改函数内部，不改变indexYear
          this.setData({
            _indexYear:val
          })
        }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    month:'',
    year:'0',
    _indexYear:''
  },
  attached:function(){
      let date=new Date();
      let year=date.getFullYear();
      let month=date.getMonth();
      month=this.data.months[month]
      this.setData({
        year:year,
        month:month
      })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
