import { mapValues, without } from 'lodash-es'
import type { FormColumnProps, FormTypeProps } from 'cjx-low-code'

export type CommonDefaultProps = Pick<FormColumnProps, 'style' | 'clearable' | 'span'>

export type ControlPropertiesProps = FormColumnProps & FormColumnProps['style']

export const commonDefaultProps: CommonDefaultProps = {
  style: {},
  clearable: true,
  span: 24
}

export const formItemsDefaultProps: FormTypeProps = {
  input: {
    placeholder: '请输入',
  },
  textarea: {
    rows: 4,
    placeholder: '请输入',
    showWordLimit: true,
  },
  select: {
    placeholder: '请选择',
  },
  switch: {
    
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