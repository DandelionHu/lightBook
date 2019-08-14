// components/like/like.js
Component({

  behaviors: [],

  properties: {
    like:{
      type:Boolean,
      value:false
    },
    count:{
      type:Number,
      value:0
    }
  },
  
  data: {
    yesSrc:'../images/like.png',
    noSrc:'../images/like@dis.png'
  }, // 私有数据，可用于模板渲染

  methods: {
    onlike(){
      let like=this.properties.like;
      let count=this.properties.count;
      count=like?count-1:count+1;
      this.setData({
        count:count,
        like:!like
      })
      this.triggerEvent('like',{
        behavior:this.properties.like
      },{})
    }
  }
})
