<template>
  <span @click='_additem' class="textareaTool">
      多行文本
  </span>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return{
            textareaItem:{
                value:'',
                remind:'',
                title:'请填写问题',
                type:'textarea',
                questionSon:false,
                verify:[],
            }
        }
    },
    methods: {
        _additem(){
            this.$emit('additem',JSON.parse(JSON.stringify(this.textareaItem)))
        }
    }
}
</script>
<style lang="scss" scope>
.textareaTool{
    padding:5px;
    background:#bfdd9e;
    border:1px solid #243413;
    cursor:pointer;
}
</style>
