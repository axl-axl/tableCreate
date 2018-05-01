<template>
  <div class="question radioBox">
      <label class="title">
        <i class='fa fa-link' v-if="content.questionSon"></i>
        {{content.id}}、{{content.title}}
        <i :class="content.verify.length?'fa fa-asterisk':''"></i>
      </label>
      <p v-if='content.remind' class="remind">{{content.remind}}</p>
      <div class="item" v-for='(item,key) in content.items' :key='key'>
          <input type="radio" :value='item.value' v-model="content.value">
          {{item.value}}
          <input type="text" placeholder="请填写其他" v-if="item.other">
      </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props:['content']
}
</script>

