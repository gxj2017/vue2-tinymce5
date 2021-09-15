import tinymce from 'tinymce'

import { templateList } from '../jsonData/datas'

tinymce.PluginManager.add('compacttemplatelist', function (editor) {
    const templateListData = templateList || []
    let backData = null
    
    // 自定义侧边栏
    editor.ui.registry.addSidebar('compactTemplateList', {
        tooltip: '合同模板列表', // 所述tooltip悬停在侧边栏切换按钮时显示指定的工具提示。
        icon: 'liebiao',
        text: '合同模板列表',
        onSetup: function (api) {
            console.log(editor,tinyMCE.activeEditor.ui.registry.getAll().buttons)
        },
        onShow: function (api) {
            const element = api.element()
            element.style.width = '400px'
            element.style.border = '1px solid #efefef'

            const isEleNull = tinymce.activeEditor.dom.isEmpty(element)
            
            // 创建元素
            let containernode = tinymce.activeEditor.dom.create('div', { id: 'sidebarcontainer2', style: 'width: 100%;display:flex;flex-direction:column' })
            let titlenode = tinymce.activeEditor.dom.create('h2', { id: 'sidebartitle', style: 'width: 100%;height:40px;font-weight:bold;padding:10px;border-bottom: 1px solid #efefef' }, '合同模板列表')
            let mainnode = tinymce.activeEditor.dom.create('div', { id: 'mainContent', style: 'padding:10px;flex:1;overflow-y:auto' })

            // 插入元素
            containernode.appendChild(titlenode)
            containernode.appendChild(mainnode)

            if(isEleNull){
                tinymce.activeEditor.dom.add(element, containernode)
            }
            

            // 创建按钮区域内容
            for (let i = 0; i < templateListData.length; i++) {
                let itemData = templateListData[i]
                const listItemNode = tinymce.activeEditor.dom.create('div', { class: 'listItem', style: `width: 100%; padding: 10px 10px; box-sizing: border-box;border-bottom: 1px dashed #efefef;` })
                const titleNode = tinymce.activeEditor.dom.create('div',{class: 'titleName', style: 'font-size: 14px;font-weight: bold;margin-bottom:5px;'},itemData.content_title)
                const contentNode = tinymce.activeEditor.dom.create('div',{class: 'contentContainer', style: 'font-size: 14px; color: #666'},itemData.content)
                const bottomNode = tinymce.activeEditor.dom.create('div',{class: 'bottomContainer', style: 'width:100%;margin-top:10px;display:flex;justify-content:space-between;align-items:center'})
                
                const creatorNode = tinymce.activeEditor.dom.create('div',{class: 'creator', style: 'width:50%;font-size: 14px; color: #666'})
                const creatorNameNode = tinymce.activeEditor.dom.create('span',{class: 'creatorName', style: 'font-size: 14px; color: #666;margin-right:20px'},itemData.creator_name)
                const creatorTimeNode = tinymce.activeEditor.dom.create('span',{class: 'creatorTime', style: 'font-size: 14px; color: #666;margin-right:20px'},itemData.create_at)

                const btnNode = tinymce.activeEditor.dom.create('div',{class: 'creator', style: 'width:50%;font-size: 14px; color: #333;text-align:right;'})
                const yulanNode = tinymce.activeEditor.dom.create('button',{class: 'yulanBtn', style: 'font-size: 14px; color: #333;margin-right:20px'},'预览')
                const useNode = tinymce.activeEditor.dom.create('button',{class: 'useBtn', style: 'font-size: 14px; color: #333;'},'使用')

                // 预览
                tinymce.activeEditor.dom.bind(yulanNode,'click',()=>{
                    editor.execCommand('mcePreview',itemData.content)
                })

                // 使用
                tinymce.activeEditor.dom.bind(useNode,'click',()=>{
                    // 给编辑器暴露个回调函数
                    tinymce.activeEditor.execCallback('use_template_click',itemData)
                })

                tinymce.activeEditor.dom.add(creatorNode, creatorNameNode)
                tinymce.activeEditor.dom.add(creatorNode, creatorTimeNode)

                tinymce.activeEditor.dom.add(btnNode, yulanNode)
                tinymce.activeEditor.dom.add(btnNode, useNode)

                tinymce.activeEditor.dom.add(bottomNode, creatorNode)
                tinymce.activeEditor.dom.add(bottomNode, btnNode)

                tinymce.activeEditor.dom.add(listItemNode, titleNode)
                tinymce.activeEditor.dom.add(listItemNode, contentNode)
                tinymce.activeEditor.dom.add(listItemNode, bottomNode)



                // 为按钮绑定点击事件
                tinymce.activeEditor.dom.bind(listItemNode, 'click', () => {
                    let bm = tinymce.activeEditor.selection.getContent(listItemNode)
                    templateListData[i].value = bm
                    let temItem = templateListData[i]
                    // 按钮被点击时改变背景色
                    let buttonNodeArr = tinymce.DOM.select('#sidebarcontainer2 #mainContent .listItem')
                    for(let j = 0; j < buttonNodeArr.length; j++){
                        buttonNodeArr[j].style.borderLeft = '0px'
                        buttonNodeArr[j].style.backgroundColor = '#fff'
                    }
                    listItemNode.style.borderLeft = '2px solid #efefef'
                    listItemNode.style.backgroundColor = '#f7f7f7'
                    
                    backData = templateListData[i]
                    console.log(backData)
                    // 给编辑器暴露个回调函数
                    tinymce.activeEditor.execCallback('template_item_click',backData)
                })
                tinymce.activeEditor.dom.add(mainnode, listItemNode)
            }
            console.log('Show panel', api.element())
        },
        onHide: function (api) {
            console.log('Hide panel', api.element())
        }
    })

    // /* Add a button that opens a window */
    // editor.ui.registry.addButton('compacttemplatelist', {
    //     text: '合同模板列表',
    //     onSetup: function () {
    //         console.log('sfsf')
    //     },
    //     onAction: function () {}
    // });
    // // /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    // editor.ui.registry.addMenuItem('compacttemplatelist', {
    //     text: '合同模板列表',
    //     onAction: function () {},
    //     onSetup: ()=>{}
    // });
});