<template>
  <span @click='_additem' class="textTool">
      单行文本
  </span>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return{
            textItem:{
                value:'',
                title:'请填写问题',
                type:'text',
                remind:'',
                verify:[],
                questionSon:false,
            }
        }
    },
    methods: {
        _additem(){
            this.$emit('additem',JSON.parse(JSON.stringify(this.textItem)))
        }
    }
}
</script>
<style lang="scss" scope>
.textTool{
    padding:5px;
    background:#bfdd9e;
    border:1px solid #243413;
    cursor:pointer;
}
</style>
