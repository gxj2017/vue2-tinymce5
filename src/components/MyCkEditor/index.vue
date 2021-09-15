<template>
  <div id="app">
    <ckeditor
      v-model="editorData"
      :editor="editor"
      :config="editorConfig"
    />
  </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'App',
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // // The configuration of the editor.
        // plugins: [],
        toolbar: {
          items: [
            'heading',
            '|',
            'fontfamily',
            'fontsize',
            '|',
            'alignment',
            '|',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            'subscript',
            'superscript',
            '|',
            'link',
            '|',
            'outdent',
            'indent',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            '|',
            'code',
            'codeBlock',
            '|',
            'insertTable',
            '|',
            'uploadImage',
            'blockQuote',
            '|',
            'undo',
            'redo'
          ],
          shouldNotGroupWhenFull: true
        },
        fontsize: {
          options: [8, 10, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 32, 48]
        },
        image: {
          styles: ['full', 'alignLeft', 'alignRight'],
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:full',
            'imageStyle:alignRight',
            '|',
            'imageTextAlternative'
          ]
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        }
      }
    }
  },
  created() {

  }
}
</script>
