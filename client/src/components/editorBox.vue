<template>
  <div id="editorBox">
    <title-editor :titleEditor.sync='title'></title-editor>
    <radio-editor v-if="!!content && content.type === 'radio'" :content.sync="content" @delQuestion="_delQuestion" @createQuestionRelation="_createQuestionRelation"></radio-editor>
    <checkbox-editor v-if="!!content && content.type==='checkbox'" :content.sync="content" @delQuestion="_delQuestion"
    @createQuestionRelation="_createQuestionRelation"></checkbox-editor>
    <textEditor v-if="!!content && content.type==='text'" :content.sync="content" @delQuestion="_delQuestion"></textEditor>
    <textarea-editor v-if="!!content && content.type==='textarea'" :content.sync="content" @delQuestion="_delQuestion"></textarea-editor>
    <select-editor v-if="!!content && content.type==='select'" :content.sync="content" @delQuestion="_delQuestion"></select-editor>
  </div>
</template>
<script>
import radioEditor from '@/components/editorBox/radioEditor';
import checkboxEditor from '@/components/editorBox/checkboxEditor';
import textEditor from '@/components/editorBox/textEditor';
import textareaEditor from '@/components/editorBox/textareaEditor';
import selectEditor from '@/components/editorBox/selectEditor';
import titleEditor from '@/components/editorBox/titleEditor'
export default {
  props:['content','titleEditor'],
  data(){
    return{
      title:''
    }
  },
  components: {
    radioEditor,checkboxEditor,textEditor,textareaEditor,selectEditor,titleEditor
  },
  methods:{
    _delQuestion(){
      this.$emit('delQuestion')
    },
    _createQuestionRelation(index,old){
      this.$emit('createQuestionRelation',index,old);
    }
  },
  watch:{
    title:function(val,old){
      this.$emit('update:titleEditor',val)
    }
  }
}
</script>
<style lang='scss' scope>
#editorBox{
  width:300px;
  height:100vh;
  background:#225c59;
  position:fixed;
  left:0;
  top:41px;
  color:#fff;
}
</style>


