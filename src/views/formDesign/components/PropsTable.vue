<template>
  <div class="props-table" >
    <el-collapse v-model="activeKey" >
      <el-collapse-item v-for="(item, index) of finalProps"
        :name="index + 1"  :title="item.attributeName" >
        <div
          v-for="(value, key) in item.mapPropsToForms"
          :key="key"
          class="prop-item">

          <div :class="['flex items-center', value.direction === 'vertical' ? 'vertical' : 'horizontal']" :style="getItemStyle(value.direction)" v-if="value"  :id="`x_${key.toString()}`" >
            <span class="label"> {{ value.text }}： </span>
            
            <component class="prop-component"
              :is="value.component"
              v-model="value.value"
              v-bind="value.extraProps"
              v-on="value.events"
              >

              <!-- 子组件 -->
              <template v-if="value.options">

                <component
                  :is="value.subComponent" 
                  v-for="(prop, propName) in value.options"
                  :label="propName" :value="prop.value" >
                    <render-v-node v-if="prop.label" :v-node="prop.label"/>
                </component>

              </template>
              
            </component>
          </div>
        </div>
      
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { storeToRefs } from 'pinia';
import { reduce } from 'lodash'
import getMapPropsToFormsList from '@/propsMap'
import type { PropsToForm } from '@/propsMap'
// import { PartialTextComponentProps } from '../../hooks/useComponentCommon'
import RenderVNode from '@/components/common/RenderVNode'
import type { ControlPropertiesProps } from '@/defaultProps'
import type { FormItemType } from 'cjx-low-code'
import useTheme from '@/store/modules/theme'

const { themeColor } = storeToRefs(useTheme())

export interface FormInterface {
  component: string
  // 子组件
  subComponent?: string,
  direction?: 'horizontal' | 'vertical'
  // 样式名字
  text?: string,
  // // 绑定值
  value: string
  // 父组件的 v-bing
  extraProps?: { [key: string]: any}
  // 子组件的 option
  options?: { [key: string]: any}[]
  // 样式值 的转化
  initialTransform?: (v: any) => any
  // 事件名
  eventName: string
  events: { [key: string]: (e: any) => void }
}

const getItemStyle = (direction: FormInterface['direction']): CSSProperties => {
  const style: CSSProperties = direction === 'vertical' ? {
    flexDirection: 'column',
    alignItems: 'flex-start',
  } : {}
  return style
}



type FormProps = {
  [p in keyof ControlPropertiesProps]: FormInterface
}

type PropsToFormsList = Array<{
  attributeName: string,
  mapPropsToForms: FormProps
}>

interface Props {
  type: FormItemType
}

const activeKey = ref<string[]>(['']);

setTimeout(() => {
  activeKey.value = ['1']
}, 100)

let mapPropsToFormsList = getMapPropsToFormsList(themeColor.value)


const emit = defineEmits(['change'])

const props = defineProps<Props>()

const testType = {
  label: '',
  placeholder: '请输入',
  span: 24,
  fontFamily: '',
  fontSize: 12
}

const finalProps = ref<PropsToFormsList>(getFinalProps())


function getFinalProps():PropsToFormsList {
  console.log(1111, props.type)
  return reduce(mapPropsToFormsList, (result, value, index) => { 
  
    // console.log(value)
    const mapPropsToForms = reduce(props.type, (resultArr, res, key) => { 
      
      // console.log(1111, value.mapPropsToForms, key)
      const item = value.mapPropsToForms[key]
      
      if (item) {
        const {eventName = 'change', initialTransform, afterTransform, extraProps = {} } = item
        // console.log(1111, item)
        const newItem: FormInterface = {
          ...item,
          value: initialTransform ? initialTransform(res) : res,
          extraProps: {
            ...extraProps,
            // defaultColor: props.type[key] || extraProps.defaultColor
          },
          eventName,
          events: {
            [eventName]: (e: any) => { emit('change', { key, value: afterTransform ? afterTransform(e) : e}) }
          },
        }

        // console.log(0, resultArr)
        resultArr[key] = newItem
      }
      // console.log(0, resultArr)
      return resultArr; 
    }, {} as FormProps); 

    result[index] = {
      attributeName: value.attributeName,
      mapPropsToForms: mapPropsToForms
    } 
    // console.log(1111, mapPropsToForms)
    return result; 
  }, [] as PropsToFormsList); 
}

const getShowHeight = (key?: string) => {
  if(!key) {
    return {}
  }
  const styles: {height?: string, overflow?: string} = {}
  if (key === 'url') {
    // styles.height = props.type.actionType === 'url' ? '36px' : '0'
    styles.overflow = 'hidden'
  }
  return styles
}

// console.log(99, finalProps.value)
watch(props, (value) =>{
  finalProps.value = getFinalProps()
})

watch(() => themeColor.value, (newVal) => {
  // console.log(1111, newVal)
  mapPropsToFormsList = getMapPropsToFormsList(newVal)
  finalProps.value = getFinalProps()
})

</script>

<style lang="scss">

.props-table {
  // height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  text-align: left;
  .el-radio-button__inner {
    padding: 8px 12px !important;
  }
  ::v-deep(.el-radio-button__inner) {
    padding: 8px 12px !important;
  }
  .prop-item {
    width: 100%;
    margin-bottom: 12px;
    text-align: left;
    .vertical {
      .label {
        width: 100%;
      }
      .prop-component {
        width: 100%;
        padding-top: 10px;
      }
    }
    .label {
      width: 28%;
      
    }
    .prop-component {
      width: 70%;
    }
  }
  
}
</style>