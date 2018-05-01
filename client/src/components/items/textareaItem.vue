<template>
  <div class="question textareaBox">
      <label class="title">
        <i class='fa fa-link' v-if="content.questionSon"></i>
        {{content.id}}、{{content.title}}
        <i :class="content.verify.length?'fa fa-asterisk':''"></i>
      </label>
      <p v-if='content.remind' class="remind">{{content.remind}}</p>
      <div class="item">
        <textarea cols="30" rows="10" v-model="content.value"></textarea>
      </div>
  </div>
</template>
<script>
export default {
  props:['content']
}
</script>