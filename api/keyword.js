import { HTTP } from '../utils/http'
class KeywordApi extends HTTP{
    constructor(){
        super(); // 用在构造函数中，必须在使用this之前调用
        this.key='keyword',
        this.maxLength=10
    }
    getHistory(){
        const words=wx.getStorageSync(this.key);
        if(!words){
            return []
        }
        return words
    }

    getHot(){
        return this.request({
            url:'book/hot_keyword'
        })
    }

    addToHistory(keyword){
        let words=this.getHistory();
        const has=words.includes(keyword);//检查数组中有没有keyword
        if(!has){
            //大于 maxLength 数组末尾 删除，再添加
            const length=words.length;
            if(length>=this.maxLength){
                words.pop();//删除末尾
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
    }

    search(start,q){
        return this.request({
            url:'book/search?summary=1',
            data:{
                q:q,
                start:start
            }
        })
    }
}

export{
    KeywordApi
}