// 提取分页 共用的方法
let paginationBev=Behavior({
    properties: {
        
    },
    data:{
        start:0,
        count:20,
        dataArray:[],
        empty:true,//搜索结果为空
        searchEnding:false //搜索结束
    },
    methods:{
        //加载更多数据
        setMoreData(dataArray){
            if (dataArray==false) {
                //传进来的值是空
                this.setData({
                    searchEnding:true
                })
                if(this.data.dataArray==false){
                    //整个列表为空
                    this.setData({
                        empty:false
                    })
                }
            }
            let temp=this.data.dataArray.concat(dataArray);
            let start=this.data.start
            start+=this.data.count  //下一页从多少条数开始
            this.setData({
                dataArray:temp,
                start:start
            })
        },
        //获取当前页码
        getCurrentStart(){
            return this.data.start
        },
        //初始化
        initPagination(){
            this.setData({
                dataArray:[],
                empty:true,
                start:0,
                count:20,
                searchEnding:false 
            })
        }
    }
})

export {
    paginationBev
}