
import { BookModal } from '../../models/book.js'
var BookModal=new BookModal();

page({
    //页面的初始数据
    data:{
        books:Object
    },
    onLoad:function(){
        BookModal.getHotList((data)=>{
            this.setData({
                books:data
            })
        })
    },
    onShow:function(){

    }
})