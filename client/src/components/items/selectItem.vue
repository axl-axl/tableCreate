<template>
  <div class="question selectBox">
      <label class="title">
        <i class='fa fa-link' v-if="content.questionSon"></i>
        {{content.id}}、{{content.title}}
        <i :class="content.verify.length?'fa fa-asterisk':''"></i> 
      </label>     
      <p v-if='content.remind' class="remind">{{content.remind}}</p>
      <div class="item">
        <select v-model='content.value'>
            <option v-for='(item,key) in content.items' :key="key">{{item.value}}</option>
        </select>
      </div>
  </div>
</template>
<script>
export default {
  props:['content']
}
</script>
