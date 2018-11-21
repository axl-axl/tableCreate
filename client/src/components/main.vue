<template>
  <div>
      <items-tools @addItem="_addItem"></items-tools>
      <div id="editorBox" v-if="contents.length">
            <title-editor :titleEditor.sync='title'></title-editor>
            <radio-editor :content.sync="contents[editorIndex>-1?editorIndex:(contents.length-1)]" 
                @delQuestion="_delQuestion" 
                @createQuestionRelation="_createQuestionRelation"
                @delQuestionRelative="_delQuestionRelation"
            ></radio-editor>
            <checkbox-editor :content.sync="contents[editorIndex>-1?editorIndex:(contents.length-1)]" 
                @delQuestion="_delQuestion"
                @createQuestionRelation="_createQuestionRelation"
                @delQuestionRelative="_delQuestionRelation"
            ></checkbox-editor>
            <textEditor :content.sync="contents[editorIndex>-1?editorIndex:(contents.length-1)]" 
                @delQuestion="_delQuestion"
            ></textEditor>
            <textarea-editor :content.sync="contents[editorIndex>-1?editorIndex:(contents.length-1)]" 
                @delQuestion="_delQuestion"
            ></textarea-editor>
            <select-editor :content.sync="contents[editorIndex>-1?editorIndex:(contents.length-1)]" 
                @delQuestion="_delQuestion"
            ></select-editor>
      </div>

      <section class="main">
        <div v-for='(content,key) in contents' :key="key" :class="['row',key==editorIndex?'rowEditor':'']" :data-index='key' @click="_editorIndex(key)" draggable='true' @dragstart="_dragStart">
            <radio-item v-if='content.type === "radio"' :content="content"></radio-item> 
            <checkbox-item v-if='content.type === "checkbox"' :content="content"></checkbox-item>
            <select-item v-if="content.type==='select'" :content="content"></select-item>
            <text-item v-if="content.type==='text'" :content='content'></text-item>
            <textarea-item v-if="content.type==='textarea'" :content="content"></textarea-item>
        </div>
        <button @click="_create" class="submit">生成</button>
      </section>
  </div>
</template>
<script>
import Vue from 'vue';
import radioEditor from '@/components/editorBox/radioEditor';
import checkboxEditor from '@/components/editorBox/checkboxEditor';
import textEditor from '@/components/editorBox/textEditor';
import textareaEditor from '@/components/editorBox/textareaEditor';
import selectEditor from '@/components/editorBox/selectEditor';
import titleEditor from '@/components/editorBox/titleEditor'

import itemsTools from '@/components/itemsTools.vue';
import radioItem from '@/components/items/radioItem.vue';
import checkboxItem from '@/components/items/checkboxItem.vue';
import selectItem from '@/components/items/selectItem.vue';
import textItem from '@/components/items/textItem.vue';
import textareaItem from '@/components/items/textareaItem.vue'
import {mapMutations} from 'vuex'

export default {
    data(){
        return{
            editorIndex:-1,//当前所处的item
            title:'',//表名
            contents:[]//所有的问题集合
        }
    },
    components: {
        itemsTools,radioItem,checkboxItem,selectItem,textItem,textareaItem,
        radioEditor,checkboxEditor,textEditor,textareaEditor,selectEditor,titleEditor
    },
    watch:{
        contents:{
            handler:function(val,old){
                Vue.set(this,'editorIndex',(val.length-1))
            },
            deep:true
        }
    },
    methods:{
        ...mapMutations(['addArrayId']),
        _addItem(item){//添加问题
            let contents = JSON.parse(JSON.stringify(this.contents));
            let id = this.$store.state.arrayId;
            item.id = id;
            this.addArrayId();
            contents.push(item);
            Vue.set(this,'contents',contents)
            // Vue.set(this,'editorIndex',contents.length-1)
        },
        _editorIndex(index){//修改问题
            Vue.set(this,'editorIndex',index)
        },
        _delQuestion(){//删除问题
            let contents = JSON.parse(JSON.stringify(this.contents));
            let index = this.editorIndex>-1?this.editorIndex:this.contents.length-1;
            contents.splice(index,1);
            
            Vue.set(this,'contents',contents)
        },
        _create(){//提交html到后台
            if(!this.title || !this.contents.length){
                return false;
            }
            this.ajax.post('/api/create',{contents:this.contents,title:this.title}).then((res)=>{
                alert("创建成功")
            }).catch((error)=>{
                if(error){
                    alert("创建失败")
                }
            })
        },
        _delQuestionRelation(index){//删除关联问题
            const contents = JSON.parse(JSON.stringify(this.contents));
            for(let i=0;i<contents.length;i++){
                if(contents[i].id == index){
                    contents[i].questionSon = false;
                    break;
                }
            }
            Vue.set(this,'contents',contents)
        },
        _createQuestionRelation(index){//创建关联问题
            const contents = JSON.parse(JSON.stringify(this.contents));
            const status = contents.some((val)=>{
                return val.id==index
            })
            if(!status){
                alert('问题不存在请先创建');
                return false;
            }
            for(let i=0;i<contents.length;i++){
                if(contents[i].id == index){
                    contents[i].questionSon = true;
                    break;
                }
                
            }
            Vue.set(this,'contents',contents);
        },
        _dragStart(ev){
            console.log(ev)
        }
    }
}
</script>
<style lang="scss">
@import '../../public/css/font-awesome.css';
@import '../../public/css/html.scss';
section.main{
    width:800px;
    transform:translateX(150px);
    margin-top:20px;
    background:url('../../public/css/bg.jpg') repeat center;
    background-color:#fff;
    background-size:100%;
} 
#editorBox{
  width:300px;
  height:100vh;
  background:#225c59;
  position:fixed;
  left:0;
  top:41px;
  color:#fff;
}
.rowEditor{
    background:#b8e3f5;
    padding:5px 0;
}
</style>

