<template>
  <div id="checkboxEditorBox" v-if="content.type==='checkbox'">
    <label>问题:</label>
    <div class="question">
      <input type="text" v-model="content.title" placeholder="请填写问题" />
      <i class="fa fa-remove" @click="_delQuestion"></i>
    </div>
    <label>选项:</label>
    <div class="row" v-for='(item,key) in content.items' :key="key">
        <input type="text" v-model="item.value" placeholder="请填写选项内容">
        <input type="number" v-model='item.relationQuestion' placeholder="关联题号" min='1' v-if="!item.relationQuestion" @blur="_addQuestionRelative(item.relationQuestion)">
        <i class="fa fa-link" @click="_delQuestionRelative(item.relationQuestion,key)" v-else></i>
        <i class="fa fa-plus-circle" @click="_addItem(key)" v-if="!item.other"></i>
        <i class="fa fa-remove" @click="_removeItem(key)"></i>
    </div>
    <p class="other" @click="_addOther" v-if="!content.items[content.items.length-1].other">添加其他选项</p>
    <label>提示:</label>
    <div class="row">
      <input type="text" placeholder="如果需要请填写提示" v-model="content.remind">
    </div>
    <label>校验</label>
    <div class="row">
      <input type="checkbox" v-model="content.verify" value='1'>必填
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      item:{
        value:'请填写选项内容',
        relationQuestion:''
      }
    }
  },
  props:['content'],
  methods:{
    _addItem(key){
      let item = JSON.parse(JSON.stringify(this.item));
      this.content.items.splice(key+1,0,item)
    },
    _removeItem(key){
      this.content.items.splice(key,1)
    },
    _delQuestion(){
      this.$emit('delQuestion')
    },
    _addOther(){
      let item={
        value:'其他',
        other:true
      }
      this.content.items.push(item)
    },
    _delQuestionRelative(index,key){//删除关联问题
      this.content.items[key].relationQuestion = '';
      this.$emit('delQuestionRelative',index)
    },
    _addQuestionRelative(index){//添加关联问题
      if(!index){
        return false;
      }
      if(index == this.content.id){
        alert('不能关联自己');
        return false;
      }
      this.$emit('createQuestionRelation',index);
    }
  }
}
</script>
<style lang="scss" scope>
#checkboxEditorBox{
  text-align:left;
  padding-left:10px;
  box-sizing:border-box;
  label{
    display:block;
    margin:10px 0;
  }
  input[type="text"]{
    width:200px;
    line-height:26px;
    padding:0 5px;
  }
  input[type="number"]{
    width:40px;
    font-size:12px;
    line-height:26px;
  }
  input[type='radio'],input[type='checkbox']{
    margin-right:10px;
  }
  .question{
    line-height:26px;
    margin:0;
    i{
      cursor: pointer;
    }
  }
  .row{
    margin-bottom:10px;
    i{
      cursor: pointer;
    }
  }
  .other{
    font-size:12px;
    border:1px solid #ddd;
    display:inline-block;
    padding:0 10px;
    cursor: pointer;
  }
}
</style>

