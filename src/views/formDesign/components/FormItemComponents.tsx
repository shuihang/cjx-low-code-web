import { defineComponent, createVNode } from 'vue'
import type { Component } from 'vue'
import { ElRow, ElCol, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCheckbox, ElCheckboxGroup, ElSwitch } from 'element-plus'
import useEditorStore from '@/store/modules/editor'
import type { FormItemsDefaultPropsType } from '@/defaultProps'
import type { FormItemType, FormTypeProps, FormColumnProps } from 'cjx-low-code'
import { objectType } from '@/utils/type'

type ComponentsMapType = {
  [key in FormItemType]?: {
    component: Component
    subComponent?: Component
  } & FormTypeProps[key]
}

const componentsMap: ComponentsMapType= {
  input: {
    component: ElInput,
  },
  textarea: {
    component: ElInput,
  },
  inputNumber: {
    component: ElInput,
  },
  select: {
    component: ElSelect,
    subComponent: ElOption,
  },
  radio: {
    component: ElRadioGroup,
    subComponent: ElRadio,
  },
  checkbox: {
    component: ElCheckboxGroup,
    subComponent: ElCheckbox,
  },
  switch: {
    component: ElSwitch,
  }
  // cascader: {
  //   component: ElSelect,
  // },
  // datePicker: {
  //   component: ElInput,
  // },

}


export default defineComponent({
  name: 'FormCanvas',
  props: {
    option: objectType<FormColumnProps>()
  },
  setup(props) {
    // 因为是个方法，所以我们得调用一下
    // const { components } = storeToRefs(useEditorStore())
   
    return () => {
      // console.log('components', components)
      
      const { option } = props
      const { type = 'input' , dicData } = option
      
      const currentProps = option[type]
    
      const Components = componentsMap[type]?.component
      const SubComponents = componentsMap[type]?.subComponent
      
      return (<>
        <ElFormItem label={option.label}>
          {Components && createVNode(Components, {
            ...currentProps
          }, SubComponents && dicData ?
          dicData.map((item) => {
            return createVNode(SubComponents, {
              ...item
            }, null)
          })
          : null)}
        </ElFormItem>
      </>)
    }
  }
})