import tinymce from 'tinymce'

tinymce.PluginManager.add('cancelremark', function (editor) {

    editor.ui.registry.addButton('cancelremark', {
        text: '取消标注',
        icon: 'cancelRemark',
        onAction: function (eventApi) {
            let currentSelectNode = tinymce.activeEditor.selection.getNode()

            let hasClass = tinymce.activeEditor.dom.hasClass(currentSelectNode, 'remarkClass')

            let selContent = tinymce.activeEditor.selection.getContent()

            if(hasClass){
                // 说明未选中标注元素意外的元素
                tinymce.activeEditor.dom.remove(currentSelectNode)
                tinymce.activeEditor.selection.setContent(currentSelectNode.innerHTML)
            } else {
                let remarknode = currentSelectNode.childNodes
                let insertCon = ''
                let isIncluedRemark = false
                console.log(currentSelectNode,remarknode)
                for(let i = 0; i < remarknode.length; i++){
                    if(remarknode[i].nodeName === 'SPAN' && remarknode[i].className === 'remarkClass'){ 
                        isIncluedRemark = true
                        insertCon += remarknode[i].innerHTML
                    }else{
                      insertCon += remarknode[i].data  
                    }
                }
                console.log(insertCon)
                if(isIncluedRemark){
                    tinymce.activeEditor.selection.setContent(insertCon)
                }
            }

            // tinymce.activeEditor.selection.setContent('gfdgdfg')
            console.log('取消标注', tinymce.activeEditor.selection.getNode(), hasClass, selContent, eventApi)
        },
        onSetup: function (eventApi) {

        }
    });

});
