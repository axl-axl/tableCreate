<template>
    <div id="itemsLists" class="clearfix">
        <div class="title">
            工具栏
        </div>
        <ul>
            <radio-button @additem="_addRadio"></radio-button>
            <checkbox-button @additem="_addRadio"></checkbox-button>
            <select-button @additem="_addRadio"></select-button>
            <text-button @additem='_addRadio'></text-button>
            <textarea-button @additem="_addRadio"></textarea-button>
        </ul>
    </div>
</template>
<script>
import radioButton from '@/components/tool/radioTool';
import checkboxButton from '@/components/tool/checkboxTool';
import selectButton from '@/components/tool/selectTool';
import textButton from '@/components/tool/textTool';
import textareaButton from '@/components/tool/textareaTool'

export default {
    components: {
        radioButton,checkboxButton,selectButton,textButton,textareaButton
    },
    methods:{
        _addRadio(item){
            this.$emit('addItem',item)
        }
    }
}
</script>

<style lang="scss" scope>
    #itemsLists{
        >.title{
            width:300px;
            background:#225c59;
            color:#bcd1c7;
            float:left;
            line-height:41px;
        }
        >ul{
            background:#ccc;
            text-align: left;
            padding: 10px;
            width:calc(100% - 300px);
            float:right;
            >li{
                display:inline-block;
                padding:5px;
                background:#bfdd9e;
                border:1px solid #243413;
                cursor:pointer;
            }
        }
    }
</style>

