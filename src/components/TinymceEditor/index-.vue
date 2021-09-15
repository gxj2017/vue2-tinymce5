<template>
  <section id="tinymceeditor">这是tinymceeditor富文本编辑器</section>
</template>

<script>
import tinymce from 'tinymce'

import 'tinymce/icons/default/icons.min.js'

import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
// import 'tinymce/skins/content/default/content.min.css'

import 'tinymce/plugins/preview/plugin.min.js'
import 'tinymce/plugins/colorpicker/plugin.min.js'
import 'tinymce/plugins/advlist/plugin.min.js'
import 'tinymce/plugins/autolink/plugin.min.js'
import 'tinymce/plugins/link/plugin.min.js'
import 'tinymce/plugins/image/plugin.min.js'
import 'tinymce/plugins/lists/plugin.min.js'
import 'tinymce/plugins/fullscreen/plugin.min.js'
import 'tinymce/plugins/wordcount/plugin.min.js'
import 'tinymce/plugins/print/plugin.min.js'
import 'tinymce/plugins/image/plugin.min.js'
import 'tinymce/plugins/imagetools/plugin.min.js'
import 'tinymce/plugins/table/plugin.min.js'
import 'tinymce/plugins/quickbars/plugin.min.js' // 显示一个文本框，可以进行各种操作

export default {
  name: 'Tinymceeditor',
  props: {
    value: {
      type: String,
      default: '编辑器默认值'
    }
  },
  mounted() {
    tinymce.init({
      selector: '#tinymceeditor',
      language: 'zh_CN', // this.$i18n.locale
      height: '600px',
      images_upload_handler: function(blobInfo, success, failure) {
        var xhr, formData
        xhr = new XMLHttpRequest()
        xhr.withCredentials = false
        xhr.open('POST', 'postAcceptor.php')
        xhr.onload = function() {
          var json
          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status)
            return
          }
          json = JSON.parse(xhr.responseText)
          if (!json || typeof json.location !== 'string') {
            failure('Invalid JSON: ' + xhr.responseText)
            return
          }
          success(json.location)
        }
        formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())
        xhr.send(formData)
      },
      // 菜单栏
      menubar: 'file edit print bar1 bar2 format',
      menu: {
        bar1: { title: '菜单12', items: 'copy paste' },
        bar2: { title: '菜单2', items: 'cut italic forecolor backcolor' }
      },
      // 工具栏
      toolbar: [
        'bold italic underline strikethrough wordcount print image table forecolor backcolor| styleselect formatselect fontselect fontsizeselect',
        'numlist bullist outdent indent blockquote | subscript superscript | alignleft aligncenter alignright alignjustify  | undo redo removeformat preview fullscreen '
      ],
      // 插件
      plugins: 'preview fullscreen wordcount print image advlist table',
      // 通过属性初始化
      setup: (editor) => {
        editor.on('init', (e) => {
          editor.setContent(this.value)
        })
      },
      // input和change事件
      init_instance_callback: (editor) => {
        editor.on('input', (e) => {
          this.$emit('input', e.target.innerHTML)
        })
        editor.on('change', (e) => {
          this.$emit('input', e.level.content)
        })
      },
      // 状态栏指的是编辑器最底下、左侧显示dom信息、右侧显示Tiny版权链接和调整大小的那一条。默认是显示的，设为false可将其隐藏
      statusbar: false
    })
  }
}
</script>

<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.4;
  margin: 1rem;
}
table {
  border-collapse: collapse;
}
table td,
table th {
  border: 1px solid #ccc;
  padding: 0.4rem;
}
figure {
  display: table;
  margin: 1rem auto;
}
figure figcaption {
  color: #999;
  display: block;
  margin-top: 0.25rem;
  text-align: center;
}
hr {
  border-color: #ccc;
  border-style: solid;
  border-width: 1px 0 0 0;
}
code {
  background-color: #e8e8e8;
  border-radius: 3px;
  padding: 0.1rem 0.2rem;
}
.mce-content-body:not([dir="rtl"]) blockquote {
  border-left: 2px solid #ccc;
  margin-left: 1.5rem;
  padding-left: 1rem;
}
.mce-content-body[dir="rtl"] blockquote {
  border-right: 2px solid #ccc;
  margin-right: 1.5rem;
  padding-right: 1rem;
}
</style>
