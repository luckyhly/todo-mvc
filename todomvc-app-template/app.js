(function (window, Vue) {

    var arr = [
        {
            id: 1,
            content: 'abc',
            isFinish: false
        },
        {
            id: 2,
            content: 'abc',
            isFinish: true
        },
        {
            id: 3,
            content: 'abc',
            isFinish: true
        }
    ]

    new Vue({
        el: '#app',
        data: {
            dataList: JSON.parse(window.localStorage.getItem('dataList')) || [],
            newTodo: ''
        },
        // 获取光标焦点
        directives: {
            focus: {
                inserted(el) {
                    el.focus();
                }
            }
        },
         // 监听
         watch:{
            dataList:{
                handler(newarr){
                    // console.log(newarr);
                    // 监听数组变化，存入localStorage中
                    window.localStorage.setItem('dataList',JSON.stringify(newarr))
                },
                // 深度监听
                deep:true
            }
        },
        computed:{
            activeNum(){
                return this.dataList.filter(item => !item.isFinish).length
            },
            // toggleAll(){
            //     return this.dataList.every(item => item.isFinish)
            // }
            toggleAll:{
                get(){
                    return this.dataList.every(item => item.isFinish)
                },
                // 获取当前input的value值
                set(value){
                    this.dataList.forEach(item => item.isFinish = value)
                }
            }
        },
        methods: {
            // 添加新todo
            addTodo() {
                if (this.newTodo.trim()) {
                    var obj = {
                        content: this.newTodo,
                        isFinish: false,
                        // 从小到大排序，取到最大id,+1，就是当前添加数据的id
                        id:this.dataList.length?this.dataList.sort((a,b)=>a.id-b.id)[this.dataList.length-1]['id']+1:1
                    }
                    this.dataList.push(obj);
                    //  console.log(obj);
                }
                // 清空输入框
                this.newTodo='';
            },
            // 单个删除
            deleTodo(index){
                this.dataList.splice(index,1);
            },
            // 全部删除
            deleAll(){
                this.dataList = this.dataList.filter(item => item.isFinish === false)
            }
        }
    })
})(window, Vue);