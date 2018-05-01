<template>
  <div id="textEditorBox" v-if="content.type==='text'">
      <label>单行文本题目</label>
      <div class="question">
        <input type="text" v-model="content.title" placeholder="文本题目">
        <i class="fa fa-remove" @click="_delQuestion"></i>
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
  props: ['content'],
  methods:{
    _delQuestion(){
      this.$emit('delQuestion')
    }
  }
}
</script>
<style lang="scss" scope>
#textEditorBox{
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
}
</style>