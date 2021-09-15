import tinymce from 'tinymce'

import { inputMenuList } from '../jsonData/datas'

tinymce.PluginManager.add('insertinput', function (editor) {
    const btnMenuData = inputMenuList || []
    let backData = null
    
    // 自定义侧边栏
    editor.ui.registry.addSidebar('insertinput', {
        tooltip: '插入输入框', // 所述tooltip悬停在侧边栏切换按钮时显示指定的工具提示。
        icon: 'input',
        text: '插入输入框',
        onSetup: function (api) {
            console.log('Render panel', api)
            var editorEventCallback = function (eventApi) {
                let allSameClass = editor.dom.select(`.${eventApi.target.className}`)
                console.log(eventApi,editor.dom.select(`.${eventApi.target.className}`)[0])
                for (let i = 0; i < allSameClass.length; i++) {
                    tinymce.activeEditor.dom.setAttrib(allSameClass[i],'value',eventApi.target.value)
                }
            };
            editor.on('input', editorEventCallback);
            return function () {
                editor.off('input', editorEventCallback);
            }
        },
        onShow: function (api) {
            const element = api.element()
            element.style.width = '320px'
            element.style.border = '1px solid #efefef'

            const isEleNull = tinymce.activeEditor.dom.isEmpty(element)

            // 创建元素
            let containernode = tinymce.activeEditor.dom.create('div', { id: 'insertInputContainer', style: 'width: 100%;display:flex;flex-direction:column' })
            let titlenode = tinymce.activeEditor.dom.create('h2', { id: 'sidebartitle', style: 'width: 100%;height:40px;font-weight:bold;padding:10px;border-bottom: 1px solid #efefef' }, '插入输入框')
            let mainnode = tinymce.activeEditor.dom.create('div', { id: 'mainContent', style: 'padding:10px;flex:1;overflow-y:auto' })
            let setNodeContainer = tinymce.activeEditor.dom.create('div', { id: 'setNodeContainer', style: '' })
            let menuNode = tinymce.activeEditor.dom.create('div', { id: 'menuNodeContainer', style: '' })
            
            let bordernodecontainer = tinymce.activeEditor.dom.create('div', { id: 'bordernodecontainer',style:'border-bottom: 1px dashed #efefef;padding:10px 0px;margin-bottom: 10px; display:flex;justify-content:flex-start;align-items:center'})
            let radionode1 = tinymce.activeEditor.dom.create('input', { class: 'radioClass radio1', type: 'radio', name:'inputborder', value: '1',checked: true})
            let radionode2 = tinymce.activeEditor.dom.create('input', { class: 'radioClass radio2', type: 'radio', name:'inputborder', value: '2'})
            let radiotext1 = tinymce.activeEditor.dom.create('span', { class: 'radiotext1',style: 'margin-left: 4px;'},'有下边框')
            let radiotext2 = tinymce.activeEditor.dom.create('span', { class: 'radiotext2',style: 'margin-left: 4px;'},'无下边框')
            let radiocontainer1 = tinymce.activeEditor.dom.create('p', { class: 'radiocontainer1', style:'margin-right: 20px'})
            let radiocontainer2 = tinymce.activeEditor.dom.create('p', { class: 'radiocontainer2'})

            radiocontainer1.appendChild(radionode1)
            radiocontainer1.appendChild(radiotext1)
            radiocontainer2.appendChild(radionode2)
            radiocontainer2.appendChild(radiotext2)

            bordernodecontainer.appendChild(radiocontainer1)
            bordernodecontainer.appendChild(radiocontainer2)
            setNodeContainer.appendChild(bordernodecontainer)
            mainnode.appendChild(setNodeContainer)

            // 插入元素
            containernode.appendChild(titlenode)

            if(isEleNull){
                tinymce.activeEditor.dom.add(element, containernode)
            }

            // 创建按钮区域内容
            for (let i = 0; i < btnMenuData.length; i++) {
                const buttonnode = tinymce.activeEditor.dom.create('button', { class: 'remarkButton', style: `width: 84px;text-align:center;font-size:14px;border: 1px solid #eee;padding:5px;border-radius:4px;margin-right:${i%3==2?'':'20px'};margin-bottom: 10px;` }, btnMenuData[i].titleName)
                // 为按钮绑定点击事件
                tinymce.activeEditor.dom.bind(buttonnode, 'click', () => {
                    let bm = tinymce.activeEditor.selection.getContent(buttonnode)
                    btnMenuData[i].value = bm
                    let btnItem = btnMenuData[i]

                    // 按钮被点击时改变背景色
                    let buttonNodeArr = tinymce.DOM.select('#insertInputContainer #mainContent .remarkButton')
                    for(let j = 0; j < buttonNodeArr.length; j++){
                        buttonNodeArr[j].style.background = '#fff'
                    }
                    buttonnode.style.background = '#efefef'

                    // 判断选中的是是否有下划线
                    let radios = tinymce.DOM.select('#bordernodecontainer .radioClass')
                    let isBorder = true
                    console.log(radios)
                    for(let k = 0; k < radios.length; k++){
                        if(radios[k].checked === true){
                            if(radios[k].value === '1'){
                                isBorder = true
                            }else if(radios[k].value === '2'){
                                isBorder = false
                            }
                        }
                    }
                    if (isBorder) {
                        // editor.execCommand('mcebottomborderinput', btnItem)
                        const inputnode = `<input class='${btnItem.key}' data-key='${btnItem.key}' data-title='${btnItem.titleName}' value='' style='border: none; outline: none ;border-bottom: 1px solid #333; font-size: 14px;' />`
                        editor.insertContent(inputnode)
                    } else {
                        // editor.execCommand('mcenoborderinput', btnItem)
                        const inputnode = `<input class='${btnItem.key}' data-key='${btnItem.key}' data-title='${btnItem.titleName}' value='' style='border: none; outline: none ; font-size: 14px;' />`
                        editor.insertContent(inputnode)
                    }

                    console.log(tinyMCE.activeEditor.ui.registry.getAll().buttons)
                    
                })
                tinymce.activeEditor.dom.add(menuNode, buttonnode)
                
            }
            
            tinymce.activeEditor.dom.add(mainnode, menuNode)
            tinymce.activeEditor.dom.add(containernode, mainnode)
            console.log('Show panel', api.element())
        },
        onHide: function (api) {
            console.log('Hide panel', api.element())
        }
    })

    editor.addCommand('mceinsertinput',()=>{
        console.log('input输入侧边栏')
    })
});