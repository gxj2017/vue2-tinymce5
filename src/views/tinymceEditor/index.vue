<template>
  <div>
    <editor-vue class="editor" :value="editorVal" @input="inputValue" />
    <p style="padding: 20px;"> {{ editorVal }} </p>
    <div style="padding: 20px;" v-html="editorVal" />
  </div>
</template>
<script>
import editorVue from '@/components/TinymceEditor/index.vue'
export default {
  components: { editorVue },
  data() {
    return {
      editorVal: ''
    }
  },
  methods: {
    inputValue(value) {
      this.editorVal = value
    }
  }
}
</script>
