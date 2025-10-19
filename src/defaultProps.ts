import { mapValues, without } from 'lodash-es'
import type { FormColumnProps, FormTypeProps, FormItemType } from 'cjx-low-code'

export type CommonDefaultProps = Pick<FormColumnProps, 'style' | 'span' | 'tip' | 'labelTip'| 'label' | 'prop' | 'type'>

export type ControlPropertiesProps = FormColumnProps & FormColumnProps['style']

export type DicDataType = Array<{ label: string, value: string }>

export type FormItemsDefaultPropsType = {
  [key in FormItemType]?: {[K in key]: FormColumnProps[K]} & {dicData?: DicDataType} & CommonDefaultProps
} 


export const commonDefaultProps: CommonDefaultProps = {
  label: '',
  prop: '',
  style: {},
  span: 24,
  tip: '',
  labelTip: ''
}

const dicData: DicDataType = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
]

export const formItemsDefaultProps: FormItemsDefaultPropsType = {
  input: {
    ...commonDefaultProps,
    input: {
      placeholder: '请输入',
    },
  },
  textarea: {
    ...commonDefaultProps,
    textarea: {
      type: 'textarea',
      placeholder: '请输入',
      rows: 4,
    }
  },
  select: {
    ...commonDefaultProps,
    dicData,
    select: {
      placeholder: '请选择',
    }
  },
  radio: {
    ...commonDefaultProps,
    dicData,
    radio: {
      
    }
  },
  checkbox: {
    ...commonDefaultProps,
    dicData,
    checkbox: {
      
    }
  },
  switch: {
    ...commonDefaultProps,
    switch: {
    }
  }
}

// export const textStylePropNames = without(Object.keys(inputDefaultProps), 'actonType', 'url', 'text')

export const transformToComponentProps = <T extends { [key: string]: any }>(props: T) => {
  return mapValues(props, (item => {
    return {
      type: item.constructor,
      default: item
    }
  }))
}