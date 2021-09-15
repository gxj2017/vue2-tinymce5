<template>
  <div style="padding: 20px">
      <my-ck-editor />
  </div>
</template>
<script>
import myCKEditor from '@/components/MyCkEditor/index.vue'
export default {
  components: { 
      'my-ck-editor': myCKEditor
    },
  data() {
    return {
      dataForm: {
        lessonDetail: ''
      }
    }
  }
}
</script>
