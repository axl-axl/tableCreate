<template>
  <span @click='_additem' class="radioTool">
      单选
  </span>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return{
            radioItem:{
                value:'',
                title:'请填写问题',
                type:'radio',
                remind:'',
                verify:[],
                questionSon:false,
                items:[
                    {
                        value:'选项一',
                        relationQuestion:''
                    },{
                        value:'选项二',
                        relationQuestion:''
                    }
                ]
            }
        }
    },
    methods: {
        _additem(){
            this.$emit('additem',JSON.parse(JSON.stringify(this.radioItem)))
        }
    }
}
</script>
<style lang="scss" scope>
.radioTool{
    padding:5px;
    background:#bfdd9e;
    border:1px solid #243413;
    cursor:pointer;
}
</style>
