<template>
    <section class="real-app">
        <!-- keyup.enter 键盘回车事件 -->
        <input
            type="text"
            class="add-input"
            autofocus="autofocus" 
            placeholder="接下去要做什么？"
            @keyup.enter="addTodo"
         > 
         <Item 
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
         />
         <tabs 
            :filter="filter" 
            :todos="todos"
            @toggle="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template> 

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id=0
export default {
    data(){
        return{
            todos:[],
            filter:'all'
        }
    },
    components:{
        Item,
        Tabs
    },
    computed:{
        filteredTodos(){  //被过滤过的todo
            if(this.filter==='all'){
                return this.todos 
            }
            const completed=this.filter==='completed'
            return this.todos.filter(todo=>completed===todo.completed)
        }
    },
    methods:{
        addTodo(e){   //添加todo
            this.todos.unshift({ //unshift向数组的开头添加一个或多个元素，并返回新的长度
                id:id++,
                content:e.target.value.trim(), //trim() 去除字符串的头尾空格
                completed:false
            })
            e.target.value=''
        },
        deleteTodo(id){   //删除todo
            //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
            this.todos.splice(this.todos.findIndex(todo=>todo.id===id),1)
        },
        toggleFilter(state){   //切换tab
            this.filter=state
        },
        clearAllCompleted(){
            this.todos=this.todos.filter(todo=>!todo.completed)
        }
    }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>