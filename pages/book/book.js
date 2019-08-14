// pages/book/book.js
import { BookApi } from '../../api/book.js'
let BookModel=new BookApi()  //变量名和类名不能重复
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getHotList()
  },
  _getHotList(){
    BookModel.getHotList().then((res)=>{
      if(!res.msg){
        return
      }
      this.setData({
        books:res.msg
      })
    })
  },
  onBook(e){
    let item=e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/book-detail/book-detail?item='+JSON.stringify(item),
    })
  },
  onSearch(){
    this.setData({
      searching:true
    })
  },
  onCancel(){
    this.setData({
      searching:false
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

  }
})