// pages/index/index.js
import { ClassicApi } from '../../api/classic.js'
import { LikeApi } from '../../api/like.js'
let classicModel=new ClassicApi()  //变量名和类名不能重复
let LikeModel=new LikeApi()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:'',
    first:true, //当前是最新一期期刊
    latest:false, //当前不是最后一期期刊
    like_status:false,
    fav_nums:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取最新一期期刊
    this._getLatest();
  },
  _getLatest(){
    //最新期刊 去请求
    classicModel.getLatest().then((res)=>{
      if(!res.msg){
        return
      }
      wx.setStorageSync('isFirstIndex',res.msg.index);//写入缓存
      this.setData({
        classicData:res.msg,
        like_status:res.msg.like_status,
        fav_nums:res.msg.fav_nums
      })
    },(err)=>{
        console.info(err)
    })
    

  },
  onLike(e){
    console.info(e)
    let behavior=e.detail.behavior;
    //点赞 取消点赞
    LikeModel.like(behavior,this.data.classicData.id,this.data.classicData.type).then((res)=>{
      console.info(res)
    })
  },
  //点击做箭头
  onLeft(){
    let index=this.data.classicData.index+2;//后面的期刊往前翻
    let key=this._getKey(index-1);//获取到该数据key
    let classic=wx.getStorageSync(key);//获取缓存
    if(classic){
      //有缓存 直接写入
      this.setData({
        classicData:classic,
        latest: this._isLatest(classic.index),
        first: this._isFirst(classic.index)
      })
      this._getClassicLikeStatus(classic.type,classic.id)
    }else{
      //无缓存 去请求
      this._getClassic(index,'previous')
    }
  },
  //点击右箭头
  onRight(){
    let index=this.data.classicData.index-2;//最新期刊往右翻之前的期刊(倒序)
    let key=this._getKey(index+1);//获取到该数据key
    let classic=wx.getStorageSync(key);//获取缓存
    if(classic){
      //有缓存 直接写入
      this.setData({
        classicData:classic,
        latest: this._isLatest(classic.index),
        first: this._isFirst(classic.index)
      })
      this._getClassicLikeStatus(classic.type,classic.id)
    }else{
      this._getClassic(index,'next')
    }
  },
  //获取当前一期的下一期 或者上一期
  _getClassic(index,nextOrPrevious){
    classicModel.getClassic(index,nextOrPrevious).then((res)=>{
      if(!res.msg){
        return
      }
      //获取key
      let key =this._getKey(res.msg.index);
      wx.setStorageSync(key,res.msg);//写入缓存
      this.setData({
        classicData:res.msg,
        latest: this._isLatest(res.msg.index),
        first: this._isFirst(res.msg.index),
        like_status:res.msg.like_status,
        fav_nums:res.msg.fav_nums
      })
    },(err)=>{
        console.info(err)
    })
  },
  //判断当前是否是最后一期期刊
  _isLatest(index){
    return index==1?true:false
  },
  //判断当前是否是最新期刊
  _isFirst(index){
    return index==this._getLatestIndex()?true:false
  },
  _getKey(index){
    return 'classic-'+index
  },
  //获取最新期刊index
  _getLatestIndex(){
    return wx.getStorageSync('isFirstIndex')
  },
  //获取期刊点赞
  _getClassicLikeStatus(index,id){
    LikeModel.getClassicLikeStatus(index,id).then((res)=>{
      if(!res.msg){
        return
      }
      this.setData({
        like_status:res.msg.like_status,
        fav_nums:res.msg.fav_nums
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})