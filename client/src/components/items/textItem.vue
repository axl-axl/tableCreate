<template>
  <div class="question textBox">
      <label class="title">
        <i class='fa fa-link' v-if="content.questionSon"></i>
        {{content.id}}、{{content.title}}
        <i :class="content.verify.length?'fa fa-asterisk':''"></i>
      </label>
      <p v-if='content.remind' class="remind">{{content.remind}}</p>
      <div class="item">
        <input type="text" v-model="content.value" />
      </div>
  </div>
</template>
<script>
export default {
  props:['content']
}
</script>
