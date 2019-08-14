import {config} from './config'

const tips={
    1:'抱歉，出现了一个错误',
    1005:'appkey无效',
    3000:'期刊不存在'
}

class HTTP{
    constructor(){
        this.api_base_url=config.api_base_url
        this.appkey=config.appkey
    }
    request({url,method='GET',data={}}){
        return new Promise((resolve,reject)=>{
            this._request(url,method,data,resolve,reject)
        })
    }
    _request(url,method,data,resolve,reject){
        url=this.api_base_url+url
        wx.showNavigationBarLoading();//开启头部动画
        wx.request({
            url:url,
            data:data,
            method:method,
            header:{
                'content-type':'application/json',
                'appkey':this.appkey
            },
            success:(res)=>{
                let code=res.statusCode.toString();//转换成字符串
                if(code.startsWith('2')){ //返回状态是2开头的
                    resolve(res.data)
                }else{
                    let error_code=res.data.error_code;
                    this._show_error(error_code)
                }
            },
            fail:(err)=>{
                reject(err);
                this._show_error(1)
            },
            complete:()=>{
                wx.hideNavigationBarLoading();//关闭头部动画
            }
        })
    }
    _show_error(error_code){
        if(!error_code){
            error_code=1
        }
        let tip=tips[error_code];
        wx.showToast({
            title:tip?tip:tips[1],
            icon:'none',
            duration:2000
        })
    }
}

export {
    HTTP
}