// import { PartialTextComponentProps } from './hooks/useComponentCommon'
import type { FunctionalComponent, Component } from 'vue'
import type { FormItemType, FormTypeProps } from 'cjx-low-code'
import { ElInput, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCheckbox, ElCheckboxGroup, ElSwitch } from 'element-plus'
import { SingleLineTextBox, MultiLineTextBox, DropdownBox, DropdownMultiBox, RadioButton, CheckBox, Switch } from '@/components/icon'

export {
  FormTypeProps
}

type PartialArgs<T> = {
  [K in keyof T]?: T[K] 
}

type IconType<T extends FunctionalComponent> = T extends (...args: infer Args) => infer R ? (...args: PartialArgs<Args>) => R  : never

export type FormComponentProps = PickFormComponentProps & {
  icon: IconType<FunctionalComponent>
}

export type PickFormComponentProps = {
  label: string
  type: FormItemType,
  dicData?: Array<{ label: string, value: string }>
} & FormTypeProps


function getDefaultFormTemplates(color: string): FormComponentProps[] {
  return [
    {
      label: '单行文本框',
      type: 'input',
      icon: SingleLineTextBox,
    },
    {
      label: '多行文本框',
      type: 'textarea',
      icon: MultiLineTextBox,
    },
    {
      label: '下拉框',
      type: 'select',
      icon: DropdownBox,
    },
    {
      label: '下拉多选框',
      type: 'select',
      icon: DropdownMultiBox,
      select: {
        placeholder: '请选择',
        multiple: true
      },
    },
    {
      label: '单选框',
      type: 'radio',
      icon: RadioButton,
    },
    {
      label: '复选框',
      type: 'checkbox',
      icon: CheckBox,
    },
    {
      label: '开关',
      type: 'switch',
      icon: Switch,
    }
  ]
}

export default getDefaultFormTemplates