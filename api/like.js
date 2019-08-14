import {HTTP} from '../utils/http'

//继承HTTP类
class LikeApi extends HTTP{
    constructor(){
        super(); // 用在构造函数中，必须在使用this之前调用
    }
    //点赞 取消点赞
    like(behavior,artId,category){
        let url=behavior?'like':'like/cancel'
        return this.request({
            url:url,
            method:'POST',
            data:{
                'art_id':artId,
                'type':category
            }
        })
    }
    //获取某一期期刊点赞情况
    getClassicLikeStatus(category,artId){
        return this.request({
            url:`classic/favor/${category}/${artId}`,
            method:'GET'
        })
    }
}

export {
    LikeApi
}