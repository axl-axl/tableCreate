<template>
  <span @click='_additem' class="selectTool">
      下拉选择
  </span>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return{
            selectItem:{
                value:'',
                title:'请填写问题',
                type:'select',
                remind:'',
                verify:[],
                questionSon:false,
                items:[
                    {
                        value:'选项一'
                    },{
                        value:'选项二'
                    }
                ]
            }
        }
    },
    methods: {
        _additem(){
            this.$emit('additem',JSON.parse(JSON.stringify(this.selectItem)))
        }
    }
}
</script>
<style lang="scss" scope>
.selectTool{
    padding:5px;
    background:#bfdd9e;
    border:1px solid #243413;
    cursor:pointer;
}
</style>
