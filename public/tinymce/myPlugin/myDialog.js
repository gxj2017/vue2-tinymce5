
/*
  Note: We have included the plugin in the same JavaScript file as the TinyMCE
  instance for display purposes only. Tiny recommends not maintaining the plugin
  with the TinyMCE instance and using the `external_plugins` option.
*/
import tinymce from 'tinymce'

tinymce.PluginManager.add('mydialog', function (editor) {
    var openDialog = function () {
        return editor.windowManager.open({
            title: 'Example plugin',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'input',
                        name: 'title',
                        label: 'Title'
                    },
                    {
                        type: 'input',
                        name: 'titles',
                        label: 'Title'
                    }
                ]
            },
            buttons: [
                {
                    type: 'cancel',
                    text: 'Close'
                },
                {
                    type: 'submit',
                    text: 'Save',
                    primary: true
                }
            ],
            onSubmit: function (api) {
                var data = api.getData();
                /* Insert content when the window form is submitted */
                editor.insertContent('Title: ' + data.title);
                api.close();
            }
        });
    };
    /* Add a button that opens a window */
    editor.ui.registry.addButton('mydialog', {
        icon: '',
        text: 'mydialog',
        onAction: function () {
            /* Open window */
            openDialog();
        }
    });
    /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    editor.ui.registry.addMenuItem('mydialog', {
        icon: '',
        text: '弹框',
        onAction: function () {
            /* Open window */
            openDialog();
        }
    });

    return {
        getMetadata: function () {
            return  {
                name: "Example plugin",
                url: "http://exampleplugindocsurl.com"
            };
        }
    };
});


