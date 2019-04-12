import { HTTP } from '../utils/http.js'
//BookModel类  继承 HTTP类
class BookModel extends HTTP {
    constructor(){

    }
    //获取热门书籍
    getHotList(success){
        let params={
            url:'book/hot_list',
            success:success
        }
        this.request(params)
    }
    //获取书籍详细信息
    getDetail(bid,success){
        let params={
            url:'book/'+bid+'/detail',
            success:success
        }
        this.request(params)
    }
    //获取书籍点赞情况
    getLikeStatus(bid,success){
        let params = {
            url: '/book/' + bid + '/favor',
            success:success
        }
        this.request(params)
    }
    //获取喜欢书籍数量
    getMyBookCount(success){
        let params = {
            url:'/book/favor/count',
            success:success
        }
        this.request(params)
    }
}

export { BookModel }