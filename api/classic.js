import {HTTP} from '../utils/http'

//继承HTTP类
class ClassicApi extends HTTP{
    constructor(){
        super(); // 用在构造函数中，必须在使用this之前调用
    }
    //获取最新期刊
    getLatest(data){
        return this.request({
            url:'classic/latest',
            method:'GET',
            data:data
        })
    }
    //获取当前期刊的上一期 下一期
    getClassic(index,nextOrPrevious){
        return this.request({
            url:`classic/${nextOrPrevious}/${index}`,
            method:'GET',
            data:{}
        })  
    }

}

export {
    ClassicApi
}