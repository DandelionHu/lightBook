// components/search/search.js
import { paginationBev} from '../../behavior/pagination.js'
//高阶组件  可以有业务 
import {KeywordApi} from '../../api/keyword.js'
const KeywordModel=new KeywordApi()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    keyword:'',
    loading:false,//分页搜索
    loadingCenter:false,//首次搜索
  },
  attached(){
    const historyWords=KeywordModel.getHistory();
    this._getHot();
    this.setData({
      historyWords
    })
  },
  /**
   * 组件的方法列表
   */

  methods: {
    onCancel(){
      this.triggerEvent('cancel',{},{})
    },
    onConfirm(e){
      let word=e.detail.value || e.currentTarget.dataset.item;
      this.setData({
        searching:true,
        keyword:word,
        loadingCenter:true,
      })
      this.initPagination();//初始化
      KeywordModel.search(this.getCurrentStart(),word).then(res=>{
        if(!res.msg){
          return
        }
        this.setMoreData(res.msg.books)
        this.setData({
          loadingCenter:false
        })
        KeywordModel.addToHistory(word);
      })
    },
    _getHot(){
      KeywordModel.getHot().then(res=>{
        if(!res.msg){
          return;
        }
        this.setData({
          hotWords:res.msg.hot
        })
      })
    },
    onDelete(){
      this.initPagination();//初始化
      this.setData({
        searching:false,
        keyword:''
      })
    },
    //加载更多
    _loadMore(){
      //没有更多
      if(this.data.searchEnding){
          return
      }
      //正在加载
      if(this.data.loading){
          return
      }
      //没有搜索条件
      if(!this.data.keyword){
          return
      }
      this.setData({
        loading:true
      })
      KeywordModel.search(this.getCurrentStart(),this.data.keyword).then(res=>{
        if(!res.msg){
          return
        }
        this.setMoreData(res.msg.books)
        this.setData({
          loading:false
        })
      })
    }
  }
})
