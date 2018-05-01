<template>
  <div id="selectEditorBox" v-if="content.type==='select'">
    <label>问题:</label>
    <div class="question">
      <input type="text" v-model="content.title" placeholder="请填写问题" />
      <i class="fa fa-remove" @click="_delQuestion"></i>
    </div>
    <label>选项:</label>
    <div class="row" v-for='(item,key) in content.items' :key="key">
        <input type="text" v-model="item.value" placeholder="请填写选项内容">
        <i class="fa fa-plus-circle" @click="_addItem(key)"></i>
        <i class="fa fa-remove" @click="_removeItem(key)"></i>
    </div>
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
        value:'请填写选项内容'
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
    }
  }
}
</script>
<style lang="scss" scope>
#selectEditorBox{
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
}
</style>

