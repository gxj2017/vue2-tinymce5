import tinymce from 'tinymce'

import { remarkMenuList } from '../jsonData/datas'

tinymce.PluginManager.add('compactremark', function (editor) {
    const remarkMenuData = remarkMenuList || []
    let backData = null
    
    // 自定义侧边栏
    editor.ui.registry.addSidebar('compactremark', {
        tooltip: '合同标注', // 所述tooltip悬停在侧边栏切换按钮时显示指定的工具提示。
        icon: 'biaozhu',
        text: '合同标注',
        onSetup: function (api) {
            console.log('Render panel', api)
        },
        onShow: function (api) {
            const element = api.element()
            element.style.width = '320px'
            element.style.border = '1px solid #efefef'

            const isEleNull = tinymce.activeEditor.dom.isEmpty(element)

            // 创建元素
            let containernode = tinymce.activeEditor.dom.create('div', { id: 'sidebarcontainer1', style: 'width: 100%;display:flex;flex-direction:column' })
            let titlenode = tinymce.activeEditor.dom.create('h2', { id: 'sidebartitle', style: 'width: 100%;height:40px;font-weight:bold;padding:10px;border-bottom: 1px solid #efefef' }, '合同标注')
            let mainnode = tinymce.activeEditor.dom.create('div', { id: 'mainContent', style: 'padding:10px;flex:1;overflow-y:auto' })

            // 插入元素
            containernode.appendChild(titlenode)
            containernode.appendChild(mainnode)

            if(isEleNull){
                tinymce.activeEditor.dom.add(element, containernode)
            }

            // 创建按钮区域内容
            for (let i = 0; i < remarkMenuData.length; i++) {
                const buttonnode = tinymce.activeEditor.dom.create('button', { class: 'remarkButton', style: `width: 84px;text-align:center;font-size:14px;border: 1px solid #eee;padding:5px;border-radius:4px;margin-right:${i%3==2?'':'20px'};margin-bottom: 10px;` }, remarkMenuData[i].titleName)
                
                tinymce.activeEditor.dom.bind(buttonnode, 'mouseenter', () => {
                    buttonnode.style.background = '#efefef'
                })
                tinymce.activeEditor.dom.bind(buttonnode, 'mouseleave', () => {
                    // 按钮被点击时改变背景色
                    let buttonNodeArr = tinymce.DOM.select('#sidebarcontainer1 #mainContent .remarkButton')
                    for (let j = 0; j < buttonNodeArr.length; j++) {
                        buttonNodeArr[j].style.background = '#fff'
                    }
                })
                
                // 为按钮绑定点击事件
                tinymce.activeEditor.dom.bind(buttonnode, 'click', () => {
                    let bm = tinymce.activeEditor.selection.getContent(buttonnode)
                    remarkMenuData[i].value = bm
                    let remarkItem = remarkMenuData[i]
                    // 未选内容
                    if(!bm){
                        tinymce.activeEditor.notificationManager.open({
                            text: '请选择您要标注的内容',
                            type: 'error',
                            timeout: 2000
                        });
                        return
                    }

                    // // 按钮被点击时改变背景色
                    // let buttonNodeArr = tinymce.DOM.select('#sidebarcontainer1 #mainContent .remarkButton')
                    // for(let j = 0; j < buttonNodeArr.length; j++){
                    //     buttonNodeArr[j].style.background = '#fff'
                    // }
                    // buttonnode.style.background = '#efefef'

                    // 将选中要标记的内容方标签
                    let remarknode = tinymce.activeEditor.dom.create('span', {class: 'remarkClass', style: 'color: green', 'data-type': remarkItem.key, 'data-value': bm, 'data-remark': remarkItem.titleName}, bm)
                    tinymce.activeEditor.selection.setNode(remarknode);
                    
                    backData = remarkMenuData[i]
                    console.log(backData)
                    // 给编辑器暴露个回调函数
                    tinymce.activeEditor.execCallback('remark_button_click',backData)
                })
                tinymce.activeEditor.dom.add(mainnode, buttonnode)
            }
            console.log('Show panel', api.element())
        },
        onHide: function (api) {
            console.log('Hide panel', api.element())
        }
    })

    // /* Add a button that opens a window */
    editor.ui.registry.addButton('compactremarkbtn', {
        text: '合同标注',
        icon: 'biaozhu',
        onAction: function () {
            console.log(55)
        }
    });
    /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    editor.ui.registry.addMenuItem('compactremarkbtn', {
        text: '合同标注',
        icon: 'biaozhu',
        onAction: function () {},
        onSetup: ()=>{
            console.log(411)
        }
    });
});