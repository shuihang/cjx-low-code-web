import { VNode, h } from 'vue'
import type { FormColumnProps, FormTypeProps } from 'cjx-low-code'
import type { ControlPropertiesProps } from './defaultProps'


// 字体
const fontFamilyArr = [
  { label: '宋体', value: 'SimSun,STSong' },
  { label: '黑体', value: 'SimHei,STHeiti' },
  { label: '楷体', value: 'KaiTi,STKaiti' },
  { label: '仿宋', value: 'FangSong,STFangsong' },
  { label: '微软雅黑', value: 'Microsoft YaHei,STYhei' },
  { label: '华文细黑', value: 'STXihei,STXihei' },
  { label: '新细明体', value: '"PMingLiU",serif' },
  
  { label: 'Arial style', value: 'Arial, sans-serif' },
  { label: 'Arial Black', value: '"Arial Black",Gadget,sans-serif' },
  { label: 'Arial Narrow', value: '"Arial Narrow",Arial,sans-serif' },
  { label: 'Arial Rounded MT Bold', value: '"Arial Rounded MT Bold",Arial,sans-serif' },
  { label: 'Book Antiqua', value: '"Book Antiqua",Palatino,serif' },
  { label: 'Comic Sans', value: 'Comic Sans MS' },
  { label: 'Courier New', value: '"Courier New",Courier,monospace' },
  { label: 'Georgia', value: 'Georgia,serif' },
  { label: 'Impact', value: 'Impact,chicago' },
  { label: 'Lucida Console', value: '"Lucida Console",Monaco,monospace' },
  { label: 'Lucida Sans Unicode', value: '"Lucida Sans Unicode",Lucida Grande,sans-serif' },
  { label: 'Palatino Linotype', value: '"Palatino Linotype",Book Antiqua,Palatino,serif' },
  { label: 'Tahoma', value: 'Tahoma,Geneva,sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman",Times,serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS",Helvetica,sans-serif' },
  { label: 'Verdana', value: 'Verdana,Geneva,sans-serif' },
]

const fontFamilyOption = fontFamilyArr.map(item => {
  return {
    value: item.value,
    label: h('span', { style: { fontFamily: item.value } }, item.label)
  }
})



interface SliderMarks {
  [key: number]: {
    style: {
      color: string,
      fontSize: string,
      left?: string
    },
    label: string
  }
}
// 处理进度条样式
function getSliderMarks(data: {min: number, max: number, unit: string, color: string,left?: string}): SliderMarks {
  const { min, max, unit, color,left } = data
  return {
    [min]: {
      style: {
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: '12px',
        left: left ? left : '8px',
      },
      label: `${min + unit}`,
    },
    [max]: {
      style: {
        color: color,
        fontSize: '12px',
      },
      label: `${max + unit}`,
    }
  }
}

export interface PropsToForm {
  component: string
  // 子组件
  subComponent?: string,
  direction?: 'horizontal' | 'vertical'
  // 样式名字
  text?: string,
  // // 绑定值
  // value?: string
  // 父组件的 v-bing
  extraProps?: { [key: string]: any}
  // 子组件的 option
  options?: { label: string | VNode, value: string | number }[]
  // 样式值 的转化
  initialTransform?: (v: any) => any
  valueProp?: string
  // 事件名
  eventName?: string
  // 处理数据
  afterTransform?: (v: any) => any
}

export type PropsToForms = {
  [p in keyof ControlPropertiesProps]?: PropsToForm
}

export type PropsToFormsList = Array<{
  attributeName: string,
  objName?: string,
  mapPropsToForms: PropsToForms
}>


export default function getMapPropsToFormsList(color: string): PropsToFormsList {
  return [
    {
      attributeName: '基本设置',
      mapPropsToForms: {
        label: {
          text: '字段名',
          component: 'el-input',
          eventName: 'input',
          extraProps: {},
          afterTransform: (e: any) => e
        },
        placeholder: {
          text: '占位符',
          component: 'el-input',
          direction: 'vertical',
          eventName: 'input',
          extraProps: {
            type: 'textarea'
          },
          afterTransform: (e: any) => e
        },
        labelTip: {
          text: '标题提示语',
          component: 'el-input',
          direction: 'vertical',
          eventName: 'input',
          extraProps: {
            type: 'textarea'
          },
          afterTransform: (e: any) => e
        },
        span: {
          component: 'el-radio-group',
          text: '控件宽度',
          direction: 'vertical',
          subComponent: 'el-radio-button',
          extraProps: { buttonStyle: "solid" },
          options: [
            { label: '1/4', value: 6 },
            { label: '1/3', value: 8 },
            { label: '1/2', value: 12 },
            { label: '2/3', value: 16 },
            { label: '3/4', value: 18 },
            { label: '1', value: 24 },
          ],
          afterTransform: (e: any) => e
        },
      }
    },
    // {
    //   attributeName: '属性设置',
    //   mapPropsToForms: {
        
    //   }
    // },
    {
      attributeName: '样式设置',
      objName: 'style',
      mapPropsToForms: {
        fontFamily: {
          text: '标题字体',
          component: 'el-select',
          subComponent: 'el-option',
          extraProps: {},
          options: [
            { label: '无', value: '' },
            ...fontFamilyOption
          ]
        },
        fontSize: {
          text: '标题字号',
          component: 'el-input-number',
          extraProps: {
            
          },
          initialTransform: (v: string) =>  parseInt(v),
          afterTransform: (e: number) => e ? `${e}px` : ''
        },
        color: {
          text: '标题颜色',
          component: 'b-color-picker',
          extraProps: {
            
          }
        },
        // borderColor: {
        //   text: '标题颜色',
        //   component: 'b-color-picker',
        //   extraProps: {
        //     defaultColor: 'transparent',
        //   }
        // },
      }
    },
    
   
    // {
    //   attributeName: '事件功能',
    //   mapPropsToForms: {
    //     actionType: {
    //       text: '点击',
    //       component: 'el-select',
    //       subComponent: 'el-select-option',
    //       extraProps: {
    //         // open: true
    //       },
    //       options: [
    //         { label: '无', value: '' },
    //         { label: '打开新窗口', value: 'url'}
    //       ],
         
    //     },
    //     url: {
    //       text: '链接地址',
    //       component: 'el-input',
    //       extraProps: {},
    //       // initialTransform: (v: string) => parseInt(v),
    //       afterTransform: (e: any) => e.target.value
    //     }
    //   }
    // }
  ]
}
 
