import tinymce from 'tinymce'

import htmlToPdf from '../htmlToPdf/htmlToPdf'

tinymce.PluginManager.add('myexport', function (editor) {

    /* Add a button that opens a window */
    let exportWord = function() {
      let header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>"
      let footer = '</body></html>'
      let sourceHTML = header + editor.getContent() + footer

      let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML)
      console.log(encodeURIComponent(sourceHTML))
      let fileDownload = document.createElement('a')
      document.body.appendChild(fileDownload)
      fileDownload.href = source
      fileDownload.download = 'document.doc'
      fileDownload.click()
      document.body.removeChild(fileDownload)
    }
    let exportPdf = function() {
      console.log(tinymce.activeEditor.dom.select('#editbody'))
      let ele = tinymce.activeEditor.dom.select('#editbody')[0]
      htmlToPdf.downloadPDF(ele, 'pdf')
      editor.notificationManager.open({
        text: '该功能暂未实现',
        type: 'error',
        timeout: 2000
      })
    }
    /* Split button that lists 3 formats, and inserts the date in the selected format when clicked */
    editor.ui.registry.addMenuButton('myexport', {
        text: '',
        icon: 'daochu',
        fetch: function (callback) {
          var items = [
            {
              type: 'menuitem',
              text: 'doc',
              icon: 'wendang1',
              onAction: function (_) {
                exportWord()
              }
            },
            {
              type: 'menuitem',
              text: 'pdf',
              icon: 'pdf',
              onAction: function (_) {
                exportPdf()
              }
            }
          ];
          callback(items);
        }
      });

});
