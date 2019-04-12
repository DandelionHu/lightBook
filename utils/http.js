//引入
import { config } from './config.js'
// const config = require("./config.js");

class HTTP{
    constructor(){//constructor是一个构造方法，用来接收参数,定义内部参数
        this.baseRestUrl=config.api_blink_url
    }
    request(params){
        var url=this.baseRestUrl+params.url;
        if(!params.method){
            //不传method 默认GET
            params.method="GET";
        }
        wx.request({
            url:url,
            data:params.data,
            header:{
                'content-type': 'application/json',
                'appkey':config.appkey
            },
            method:params.metho,
            dataType:'json',
            success:function(res){
                 // 判断以2（2xx)开头的状态码为正确
                 // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                 var code=res.statusCode.toString(); //转换成字符串
                 var startChar=code.charAt(0);//返回在指定位置的字符
                //  code.startsWith('2')   返回布尔值，表示参数字符串是否在原字符串的头部
                if(startChar=='2'){
                    //正常
                    params.success && params.success(res.data)
                }else{
                    //调用 4-- 5-- 回调
                    params.error && params.error(res);
                }
            },
            fail:function(err){
                //调用失败回调
                params.fail && params.fail(err)
            }
        })
    }

}

//导出
export { HTTP };
