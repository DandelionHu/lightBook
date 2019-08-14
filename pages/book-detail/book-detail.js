// pages/book-detail/book-detail.js
import { BookApi } from '../../api/book.js'
import { LikeApi } from '../../api/like.js'
let BookModel=new BookApi()  //变量名和类名不能重复
let LikeModel=new LikeApi()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//图书id
    comments:[],
    book:null,
    itemObj:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    if(options.item){
      let item=JSON.parse(options.item)
      this.setData({
        id:item.id,
        itemObj:item
      });
      this._getDetail();
    }
  },
  _getDetail(){
    const datail= BookModel.getDetail(this.data.id).then(res=>{
      if(!res.msg){
        return
      }
      this.setData({
        book:res.msg
      })
    })
    const likeStatus=BookModel.getLikeStatus(this.data.id).then(res=>{
      if(!res.msg){
        return
      }
      this.setData({
        likeStatus:res.msg.like_status,
        likeCount:res.msg.fav_nums,
      })
    })
    const comments=BookModel.getComments(this.data.id).then(res=>{
      if(!res.msg){
        return
      }
      this.setData({
        comments:res.msg.comments
      })
    })
    Promise.all([datail,likeStatus,comments]).then(res=>{
      wx.hideLoading()
    })
  },
  onLike(e){
    let behavior=e.detail.behavior;
    //点赞 取消点赞
    LikeModel.like(behavior,this.data.id,400).then((res)=>{
      console.info(res)
    })
  },
  onFakePost(){
    this.setData({
      posting:true
    })
  },
  onCancel(){
    this.setData({
      posting:false
    })
  },
  onTap(e){
    console.info(e)
    let text=e.currentTarget.dataset.text || e.detail.value;
    if(!text){
      return;
    }
    BookModel.postComment(this.data.id,text).then(res=>{
        wx.showToast({
          title:'+1',
          icon:'none'
        })
        let comments=this.data.comments;
        comments.unshift({
          content:text,
          nums:1
        })
        this.setData({
          comments:comments,
          posting:false
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

  }
})