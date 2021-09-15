<template>
  <div id="tinymce-container-id" class="tinymce-editor" style="padding: 20px">
    <editor
      :id="initId"
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @click="onClick"
    />
  </div>
</template>
<script>
import tinymce from 'tinymce'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/icons/default/icons.min.js'

import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件

import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'

import 'tinymce/plugins/preview/plugin.min.js'
import 'tinymce/plugins/colorpicker/plugin.min.js'
import 'tinymce/plugins/advlist/plugin.min.js'
import 'tinymce/plugins/autolink/plugin.min.js'
import 'tinymce/plugins/link/plugin.min.js'
import 'tinymce/plugins/image/plugin.min.js'
import 'tinymce/plugins/lists/plugin.min.js'
import 'tinymce/plugins/fullscreen/plugin.min.js'
import 'tinymce/plugins/wordcount/plugin.min.js'
import 'tinymce/plugins/code/plugin.min.js'
import 'tinymce/plugins/print/plugin.min.js'
import 'tinymce/plugins/image/plugin.min.js'
import 'tinymce/plugins/imagetools/plugin.min.js'
import 'tinymce/plugins/table/plugin.min.js'
import 'tinymce/plugins/quickbars/plugin.min.js' // 显示一个文本框，可以进行各种操作
import 'tinymce/plugins/insertdatetime/plugin.min.js'
import 'tinymce/plugins/paste/plugin.min.js'
import 'tinymce/plugins/pagebreak/plugin.min.js'
import 'tinymce/plugins/save/plugin.min.js'
import 'tinymce/plugins/template/plugin.min.js'
import 'tinymce/plugins/hr/plugin.min.js'
import 'tinymce/plugins/autoresize/plugin.min.js'

// import 'tinymce/plugins/powerpaste/plugin.min.js' // 使用免费的Tiny 帐户尝试PowerPaste 插件和 Tiny Cloud 。新帐户可享受 Tiny高级插件、皮肤和图标包的 30 天试用期；无需信用卡信息或承诺。

// 自定义插件
import '../../../public/tinymce/myPlugin/myDialog'
import '../../../public/tinymce/myPlugin/insertInput/plugin' // 插入特定的输入框
import '../../../public/tinymce/myPlugin/insertInput/noBorderInput/plugin' // 插入输入框
import '../../../public/tinymce/myPlugin/insertInput/bottomBorderInput/plugin' // 插入输入框
import '../../../public/tinymce/myPlugin/compactRemark/plugin' // 合同标注
import '../../../public/tinymce/myPlugin/compactRemark/cancelRemark/plugin' // 取消标注
import '../../../public/tinymce/myPlugin/compactTemplateList/plugin' // 合同模板列表
import '../../../public/tinymce/myPlugin/preview/plugin' // 预览
import '../../../public/tinymce/myPlugin/myimport/plugin' // 导入
import '../../../public/tinymce/myPlugin/myexport/plugin' // 导入

export default {
  components: {
    Editor
  },
  props: {
    initId: {
      type: String,
      default: 'myTinyMce'
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // tinycomments
    plugins: {
      type: [String, Array],
      default:
        'save link lists image imagetools code table preview insertdatetime fullscreen hr print advlist paste pagebreak template quickbars autoresize powerpaste insertinput bottomborderinput noborderinput mydialog compactremark cancelremark compacttemplatelist myimport myexport'
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: window.location.origin ? window.location.origin : ''
    }
  },
  data() {
    return {
      myValue: this.value,
      init: {
        selector: '#' + this.initId,
        body_id: 'editbody',
        auto_focus: true,
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        icons_url: `${this.baseUrl}/tinymce/icons/myicons/icons.js`, // load icon pack
        content_style:
          '.mce-annotation { background-color: darkgreen; color: white; }',
        icons: 'myicons',
        min_height: 500, // 可选值为：true（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
        max_height: 800,
        resize: true,
        branding: false, // 隐藏右下角技术支持

        powerpaste_keep_unsupported_src: true,
        powerpaste_allow_local_images: true, // 设置为 时true，粘贴后不会删除在复制内容中使用数据 URI 的 Base64 编码图像。
        powerpaste_word_import: 'merge',
        powerpaste_html_import: 'merge',
        // 高级付费插件
        external_plugins: {
          powerpaste: `${this.baseUrl}/tinymce/myPlugin/powerpaste/plugin.min.js`
        },
        formats: {
          customInput: {
            inline: 'input',
            styles: {
              border: 'none',
              outline: 'none',
              'border-bottom': '1px solid #333',
              'font-size': '14px'
            }
          }
        },
        style_formats: [
          {
            title: 'Input Noborder',
            selector: 'input',
            styles: { border: 'none', outline: 'none', 'font-size': '14px' }
          },
          {
            title: 'Input Border',
            selector: 'input',
            styles: {
              border: 'none',
              outline: 'none',
              'border-bottom': '1px solid #333',
              'font-size': '14px'
            }
          }
        ],
        // 插件
        plugins: this.plugins,
        // 菜单栏
        menubar: 'file mymenu edit insert view format table tools bar2',
        menu: {
          file: { title: 'File', items: 'newdocument save print' },
          edit: {
            title: 'Edit',
            items: 'undo redo | cut copy paste pastetext | selectall'
          },
          insert: {
            title: 'Insert',
            items: 'link | pagebreak | image |  insertdatetime | hr'
          },
          view: { title: 'View', items: 'visualaid preview fullscreen' },
          format: {
            title: 'Format',
            items:
              'bold italic underline strikethrough superscript subscript | formats | removeformat'
          },
          table: {
            title: 'Table',
            items: 'inserttable tableprops deletetable | cell row column'
          },
          mymenu: { title: '我的菜单', items: 'mydialog' }
        },
        // 工具栏
        toolbar: [
          'undo redo | newdocument save | myimport myexport | compactremark compacttemplatelist | insertinput | fullscreen preview print |  cut copy paste pastetext | removeformat | bold italic underline strikethrough | numlist bullist outdent indent lineheight blockquote | subscript superscript | alignleft aligncenter alignright alignjustify | image table forecolor backcolor | hr insertdatetime pagebreak | styleselect | fontselect | formatselect | fontsizeselect |'
        ],
        quickbars_selection_toolbar: 'bold italic | link h2 h3 blockquote | cancelremark', // 当选中文本时提供可访问的快速工具栏命令
        quickbars_insert_toolbar: '', // 为快速插入对象而创建的工具栏命令，如插入表格或图像。 quickimage quicktable
        fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 24px 36px 48px',
        fullpage_default_font_size: '14px',
        insertdatetime_formats: ['%Y年%m月%d日', '%Y-%m-%d', '%H:%M:%S'],
        templates: [
          {
            title: 'Some title 1',
            description: 'Some desc 1',
            content: 'My content'
          },
          {
            title: 'Some title 2',
            description: 'Some desc 2',
            url: 'print.php'
          }
        ],
        // 通过属性初始化
        setup: (editor) => {
          var that = this
          editor.on('init', (e) => {
            editor.setContent(this.value)
          })
          // 抛出 'input' 事件钩子，同步value数据
          editor.on('input change undo redo', () => {
            this.$emit('input', editor.getContent())
          })
        },
        // input和change事件
        init_instance_callback: (editor) => {
          var that = this
          // editor.on('input', (e) => {
          //   console.log(editor.getContent(), e)
          //   this.$emit('input', e.target.innerHTML)
          // })
          // editor.on('change', (e) => {
          //   console.log(editor.getContent(), e)
          //   this.$emit('input', e.level.content)
          // })
        },
        image_advtab: true, // 此选项在图像对话框中添加了一个“高级”选项卡，允许您为图像添加自定义样式、间距和边框。
        paste_data_images: true, // //开启复制粘贴上传图片
        // 图片上传
        file_picker_types: 'image', // 目前只有三个可用的值：file、image和media
        file_picker_callback: function(callback, value, meta) {
          console.log(callback, value, meta)
          var input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'image/*')

          input.onchange = function() {
            var file = this.files[0]
            var reader = new FileReader()
            reader.onload = function() {
              var id = 'blobid' + (new Date()).getTime()
              var blobCache = tinymce.activeEditor.editorUpload.blobCache
              var base64 = reader.result.split(',')[1]
              var blobInfo = blobCache.create(id, file, base64)
              blobCache.add(blobInfo)

              /* call the callback and populate the Title field with the file name */
              callback(blobInfo.blobUri(), { title: file.name })
            }
            reader.readAsDataURL(file)
          }

          input.click()
        },
        images_upload_handler: function(blobInfo, success, failure) {
          console.log(blobInfo)
          var reader = new FileReader()
          reader.readAsDataURL(blobInfo.blob())
          reader.onload = function() {
            success(this.result)
          }
        },
        // 解决粘贴图片后，不自动上传，而是使用base64
        urlconverter_callback: function(url, node, onSave, name) {
          console.log(url, node, onSave, name, url.startsWith)
          if (node === 'img' && url.startsWith('data:image/jpeg;base64,')) {
            tinymce.activeEditor && tinymce.activeEditor.uploadImages()
          }
          return url
        },
        // 保存设置
        save_enablewhendirty: false, // 当内容无变化时禁用保存按钮
        save_onsavecallback: function() {
          console.log('已保存')
        },
        remark_button_click: function(data) {
          console.log(data)
        },
        use_template_click: function(data) {
          console.log(data)
          this.myValue = data.content
          tinymce.activeEditor.setContent(this.myValue)
        }
      }
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    onClick() {}
  }
}
</script>
