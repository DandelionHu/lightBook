// components/music/music.js
import {classicBev} from '../../behavior/classic-bev'

const mMgr = wx.getBackgroundAudioManager()//获取全局唯一背景播放
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBev],//继承
  properties: {
      src:{
        type:String
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false, //播放状态
    pauseSrc:'../images/player@pause.png',
    playSrc:'../images/player@play.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      if(!this.data.playing){
        this.setData({
          playing:true,
        })
        mMgr.title = this.properties.content;//必填
        mMgr.coverImgUrl = this.properties.img;
        // 设置了 src 之后会自动播放
        mMgr.src=this.properties.src
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause();
      }
      
    }
  },
  detached:function(){
    mMgr.stop();
  }
})
