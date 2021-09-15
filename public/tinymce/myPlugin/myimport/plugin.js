import tinymce from 'tinymce'

tinymce.PluginManager.add('myimport', function (editor) {

  /* Add a button that opens a window */

  let fileSelect = function (callback) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'application/msword, application/pdf');

    input.onchange = function () {
      var file = this.files[0];

      var reader = new FileReader();

      reader.onload = function () {
        var id = 'blobid' + (new Date()).getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        callback(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  /* Split button that lists 3 formats, and inserts the date in the selected format when clicked */
  editor.ui.registry.addMenuButton('myimport', {
    text: '',
    icon: 'daoru',
    fetch: function (callback) {
      var items = [
        {
          type: 'menuitem',
          text: 'doc',
          icon: 'wendang1',
          onAction: function (_) {
            let fileSelected = function(url, obj) {
              console.log(url,obj)
            }
            fileSelect( fileSelected )
          }
        },
        {
          type: 'menuitem',
          text: 'pdf',
          icon: 'pdf',
          onAction: function (_) {
            editor.notificationManager.open({
              text: '该功能暂未实现',
              type: 'error',
              timeout: 2000
            })
          }
        }
      ];
      callback(items);
    }
  });

});
