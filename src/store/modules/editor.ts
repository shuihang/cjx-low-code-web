/** 编辑器 业务组件 pinia */
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import type { FormItemType, FormTypeProps } from 'cjx-low-code'
import type { PickFormComponentProps, FormComponentProps } from '@/defaultFormTemplates'


import { commonDefaultProps, formItemsDefaultProps } from '@/defaultProps'

import omit from '@/utils/omit'

export type ComponentData = {
  // id, uuid 生成
  id: string
} & PickFormComponentProps

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[]
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
      const obj: PickFormComponentProps = omit(props, ['icon'])

      const item: ComponentData = {
        id: uuidv4(),
        ...obj
      }//  Object.assign({}, commonDefaultProps, formItemsDefaultProps[type], props, { id: uuidv4() })
      // @ts-ignore
      this.components.push(item)
      // console.log(1111, this.components)
    },
    setActive(currentId: string) {
      // console.log(currentId)
      this.currentElement = currentId
    },
    updateComponents(data: { key: string, value: string, id?: string}) {
      const { key, value, id } = data
      const updateComponents = this.components.find(item => item.id === id)

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
      //   updateComponents.props[key] = value
      //   // console.log(updateComponents.props[key], value)
      // }

    
    },
  },
  getters: {
    getCurrentElement: (state)  =>  {
      // @ts-ignore
      return state.components.find(item => item.id === state.currentElement)
    }
  }
})

export default useEditorStore