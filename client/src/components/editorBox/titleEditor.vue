<template>
  <div id="titleEditorBox">
      <label>表单名:</label>
      <div class="question">
        <input type='text' placeholder="请填写调查表名" v-model="title" @blur="_checkName">
      </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
    data(){
        return{
            title:''
        }
    },
    props: ['titleEditor'],
    methods:{
        _checkName(){
            const name=this.title;
            this.ajax.post('/api/check',{name:name}).then((res)=>{
                if(res.status){
                    alert('调查表名已存在不能重复命名');
                    Vue.set(this,'title','')
                }
            })
        }
    },
    watch:{
        title:function(val,old){
            this.$emit('update:titleEditor',val)
        }
    }
}
</script>
<style lang="scss" scope>
#titleEditorBox{
  text-align:left;
  padding-left:10px;
  box-sizing:border-box;
  label{
    display:block;
    margin:10px 0;
  }
  input[type="text"]{
    width:240px;
    line-height:26px;
    padding:0 5px;
  }
  .question{
    line-height:26px;
    margin:0;
    i{
      cursor: pointer;
    }
  }
}
</style>