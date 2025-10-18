// import { PartialTextComponentProps } from './hooks/useComponentCommon'
import type { FunctionalComponent } from 'vue'
import type { FormItemType, FormTypeProps } from 'cjx-low-code'
import { Open } from '@element-plus/icons-vue'
import { SingleLineTextBox, MultiLineTextBox, DropdownBox, DropdownMultiBox, RadioButton, CheckBox, Switch } from '@/components/icon'

type PartialArgs<T> = {
  [K in keyof T]?: T[K] 
}

type IconType<T extends FunctionalComponent> = T extends (...args: infer Args) => infer R ? (...args: PartialArgs<Args>) => R  : never

export type FormComponentProps = {
  [key in FormItemType]?: FormTypeProps[key]
} & {
  name: string
  type: FormItemType,
  icon: IconType<FunctionalComponent>
  dicData?: Array<{ label: string, value: string }>
}


function getDefaultFormTemplates(color: string): FormComponentProps[] {
  return [
    {
      name: '单行文本框',
      type: 'input',
      icon: SingleLineTextBox,
      input: {
        placeholder: '请输入',
      }
    },
    {
      name: '多行文本框',
      type: 'textarea',
      icon: MultiLineTextBox,
      textarea: {
        placeholder: '请输入',
        rows: 4,
      }
    },
    {
      name: '下拉框',
      type: 'select',
      icon: DropdownBox,
      select: {
        placeholder: '请选择',
      },
      dicData: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
        { label: '选项4', value: '4' },
      ]
    },
    {
      name: '下拉多选框',
      type: 'select',
      icon: DropdownMultiBox,
      select: {
        placeholder: '请选择',
        multiple: true
      },
      dicData: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
        { label: '选项4', value: '4' },
      ]
    },
    {
      name: '单选框',
      type: 'radio',
      icon: RadioButton,
      radio: {

      },
      dicData: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
        { label: '选项4', value: '4' },
      ]
    },
    {
      name: '复选框',
      type: 'checkbox',
      icon: CheckBox,
      checkbox: {
        
      },
      dicData: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
        { label: '选项4', value: '4' },
      ]
    },
    {
      name: '开关',
      type: 'switch',
      icon: Switch,
      switch: {
        
      },
    }
  ]
}

export default getDefaultFormTemplates