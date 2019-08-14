// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:{
        type:String,
        value:''
      },
      first:{  //第一期期刊
        type:Boolean,
        value:false
      },
      latest:{ //最后一期期刊
        type:Boolean,
        value:false
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:'../images/triangle.dis@left.png',
    leftSrc:'../images/triangle@left.png',
    disRightSrc:'../images/triangle.dis@right.png',
    rightSrc:'../images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
      console.info(this.properties.first)
      console.info(this.properties.latest)
    },
    onLeft(){
      if(!this.properties.first){
        //第一期 不能再点左箭头
        this.triggerEvent('left',{},{})
      }
    },
    onRight(){
      if(!this.properties.latest){
        //最后一期 不能再点右箭头
        this.triggerEvent('right',{},{})
      }
    }
  }
})
