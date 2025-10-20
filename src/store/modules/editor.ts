/** 编辑器 业务组件 pinia */
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import type { FormItemType, FormColumnProps } from 'cjx-low-code'
import type { PickFormComponentProps, FormComponentProps } from '@/defaultFormTemplates'


import { FormItemsDefaultPropsType, formItemsDefaultProps } from '@/defaultProps'

import omit from '@/utils/omit'

// export type ComponentData = {
//   // id, uuid 生成
//   id: string
// } & PickFormComponentProps

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: FormColumnProps[]
  // 当前编辑的是那个元素 uuid
  currentElement: string,
}

// export const testComponents: ComponentData[] = [
//   {
//     id: uuidv4(),
//     name: '单行文本框',
//     type: 'input',
//     input: formItemsDefaultProps.input
//   },
 
// ]


const useEditorStore = defineStore('editor', {
  state: (): EditorProps => ({
    components: [],
    currentElement: ''
  }),
  actions: {
    addComponents(props: FormComponentProps) {
      // const obj: PickFormComponentProps = omit(props, ['icon'])
      const { type, label } = props

      const item: FormColumnProps = {
        ...formItemsDefaultProps[type],
        type,
        prop: uuidv4(),
        label,
      }//  Object.assign({}, commonDefaultProps, formItemsDefaultProps[type], props, { id: uuidv4() })
      // @ts-ignore
      this.components.push(item)
      console.log(1111, this.components)
    },
    setActive(currentId: string) {
      // console.log(currentId)
      this.currentElement = currentId
    },
    updateComponents(data: { key: string, value: string, id?: string}) {
      const { key, value, id } = data
      const updateComponents = this.components.find(item => item.prop === (id || this.currentElement))
      // console.log(key, value, id)
      if (!updateComponents) return

      // if (updateComponents) {
      //   const strArr = updateComponents.props.boxShadow?.split(' ') as [string, string, string, string]
      //   if (key === 'boxShadowColor') {
      //     strArr[strArr.length - 1] = value
      //   }
      //   if (key === 'boxShadowHorizontal') {
      //     strArr[0] = value
      //   }
      //   if (key === 'boxShadowVertical') {
      //     strArr[1] = value
      //   }
      //   if (key === 'boxShadowBlur') {
      //     strArr[2] = value
      //   }
        
      //   updateComponents.props.boxShadow = strArr.join(' ')
     
      updateComponents[key] = value
      //   // console.log(updateComponents.props[key], value)
      // }

    
    },
    clearComponents() {
      this.components = []
    },
    deleteComponents() {
      this.components = this.components.filter(item => item.prop !== this.currentElement)
    },
  
    copyComponents() {
      const currentElement = this.getCurrentElement
      if (!currentElement) return
      const copyItem = cloneDeep(currentElement)
      copyItem.prop = uuidv4()
      this.components.push(copyItem)
    },
    moveComponents(fromIndex: number, toIndex: number) {
      if (fromIndex === toIndex) return
      const [movedItem] = this.components.splice(fromIndex, 1)
      this.components.splice(toIndex, 0, movedItem)
    }
  },
  getters: {
    getCurrentElement: (state)  =>  {
      // @ts-ignore
      return state.components.find(item => item.prop === state.currentElement)
    }
  }
})

export default useEditorStore