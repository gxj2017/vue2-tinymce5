import tinymce from 'tinymce'

// 将公共功能封成函数调用，光标会乱跳

tinymce.PluginManager.add('bottomborderinput', function (editor) {

    /* Add a button that opens a window */
    editor.ui.registry.addButton('bottomborderinput', {
        text: '边框输入框',
        onAction: function (eventApi) {
            const inputnode = `<input class='inputClasses${new Date().getTime()}' value='' style='border: none; outline: none ;border-bottom: 1px solid #333; font-size: 14px;' />`
            editor.insertContent(inputnode)
        },
        onSetup: function (buttonApi) {
            var editorEventCallback = function (eventApi) {
                let allSameClass = editor.dom.select(`.${eventApi.target.className}`)
                console.log(eventApi,editor.dom.select(`.${eventApi.target.className}`)[0])
                for (let i = 0; i < allSameClass.length; i++) {
                    tinymce.activeEditor.dom.setAttrib(allSameClass[i],'value',eventApi.target.value)
                }
            };
            editor.on('input', editorEventCallback);
            return function (buttonApi) {
                editor.off('input', editorEventCallback);
            }
        }
    });
    /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    /* Add a button that opens a window */
    editor.ui.registry.addMenuItem('bottomborderinput', {
        text: '边框输入框',
        onAction: function (eventApi) {
            const inputnode = `<input class='inputClasses${new Date().getTime()}' value='' style='border: none; outline: none ;border-bottom: 1px solid #333; font-size: 14px;' />`
            editor.insertContent(inputnode)
        },
        onSetup: function (buttonApi) {
            var editorEventCallback = function (eventApi) {
                let allSameClass = editor.dom.select(`.${eventApi.target.className}`)
                console.log(eventApi,editor.dom.select(`.${eventApi.target.className}`)[0])
                for (let i = 0; i < allSameClass.length; i++) {
                    tinymce.activeEditor.dom.setAttrib(allSameClass[i],'value',eventApi.target.value)
                }
            };
            editor.on('input', editorEventCallback);
            return function (buttonApi) {
                editor.off('input', editorEventCallback);
            }
        }
    });
    
    editor.addCommand('mcebottomborderinput',(data)=>{
        console.log(data)
        let datas = data
        const inputnode = `<input class='${data.key}' data-key='${data.key}' data-title='${data.titleName}' value='' style='border: none; outline: none ;border-bottom: 1px solid #333; font-size: 14px;' />`
        editor.insertContent(inputnode)
    })
});
