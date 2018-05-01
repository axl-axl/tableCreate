<template>
  <span @click='_additem' class="checkboxTool">
      多选
  </span>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return{
            checkboxItem:{
                value:[],
                title:'请填写问题',
                type:'checkbox',
                remind:'',
                verify:[],
                questionSon:false,
                items:[
                    {
                        value:'选项一'
                    },{
                        value:'选项二'
                    },{
                        value:'选项三'
                    }
                ]
            }
        }
    },
    methods: {
        _additem(){
            this.$emit('additem',JSON.parse(JSON.stringify(this.checkboxItem)))
        }
    }
}
</script>
<style lang="scss" scope>
.checkboxTool{
    padding:5px;
    background:#bfdd9e;
    border:1px solid #243413;
    cursor:pointer;
}
</style>
