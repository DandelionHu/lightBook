// components/movie/movie.js
import {classicBev} from '../../behavior/classic-bev'
Component({
  /**
   * 组件的属性列表
   */
  //多继承  子会覆盖原有的 attached 是不会覆盖，挨个调用
  behaviors:[classicBev],//继承
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
