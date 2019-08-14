import {HTTP} from '../utils/http'

//继承HTTP类
class BookApi extends HTTP{
    constructor(){
        super(); // 用在构造函数中，必须在使用this之前调用
    }
    //获取书籍列表
    getHotList(){
        return this.request({
            url:'book/hot_list',
        })
    }
    //获取喜欢书籍数量
    getMyBookCount(){
        return this.request({
            url:'book/favor_count'
        })
    }
    //获取图书详情
    getDetail(id){
        return this.request({
            url:'book/detail/'+id
        })
    }
    //获取图书点赞情况
    getLikeStatus(id){
        return this.request({
            url:'book/favor/'+id
        })
    }
    //获取图书短评
    getComments(id){
        return this.request({
            url:'book/short_comment/'+id
        })
    }
    //提交短评
    postComment(id,comment){
        return this.request({
            url:'book/add/short_comment',
            method:'POST',
            data:{
                book_id:id,
                content:comment
            }
        })
    }

}

export {
    BookApi
}