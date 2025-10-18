<template>
  <div class="props-table" >
    <a-collapse v-model:activeKey="activeKey" >
      <a-collapse-panel v-for="(item, index) of finalProps"
        :key="index + 1"  :header="item.attributeName" >
        <div
          v-for="(value, key) in item.mapPropsToForms"
          :key="key"
          class="prop-item">

          <b-flex v-if="value" :id="`a-flex_${key}`" :style="{width: '100%',
           transition: 'all 0.5s', ...getShowHeight(key)}" align="center" >
            <span class="label"> {{ value.text }}： </span>
            
            <component class="prop-component"
              :is="value.component" :value="value.value"
              v-bind="value.extraProps"
              v-on="value.events"
              >

              <!-- 子组件 -->
              <template v-if="value.options">

                <component
                  :is="value.subComponent" 
                  v-for="(prop, propName) in value.options"
                  :key="propName" :value="prop.value" >
                    <render-v-node v-if="prop.label" :v-node="prop.label"/>
                
                </component>

              </template>
              
            </component>
          </b-flex>
        </div>
      
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { reduce } from 'lodash'
import getMapPropsToFormsList from '../../propsMap'
import { PartialTextComponentProps } from '../../hooks/useComponentCommon'
import RenderVNode from '../../components/common/RenderVNode'

import { TextComponentProps } from '../../defaultProps'

import useTheme from '../../store/module/theme'
const { themeColor } = storeToRefs(useTheme())

export interface Form {
  component: string
  // 子组件
  subComponent?: string,
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

type FormProps = {
  [p in keyof TextComponentProps]: Form
}

type PropsToFormsList = Array<{
  attributeName: string,
  mapPropsToForms: FormProps
}>

interface Props {
  type: PartialTextComponentProps
}

const activeKey = ref<string[]>(['']);

setTimeout(() => {
  activeKey.value = ['1']
}, 100)

let mapPropsToFormsList = getMapPropsToFormsList(themeColor.value)


const emit = defineEmits(['change'])

const props = defineProps<Props>()

const finalProps = ref<PropsToFormsList>(getFinalProps())
function getFinalProps():PropsToFormsList {
  return reduce (mapPropsToFormsList, (result, value, index) => { 
  
    // console.log(value)
    const mapPropsToForms = reduce(props.type, (resultArr, res, key) => { 
      
      const item = value.mapPropsToForms[key]
      // console.log(1111, value.mapPropsToForms, key)
      if (item) {
        const {eventName = 'change', initialTransform, afterTransform, extraProps } = item
        const newItem: Form = {
          ...item,
          value: initialTransform ? initialTransform(res) : res,
          extraProps: {
            ...item.extraProps,
            defaultColor: props.type[key] || extraProps.defaultColor
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
    styles.height = props.type.actionType === 'url' ? '36px' : '0'
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
.ant-select-item-option-content {
  position: relative;
}
.props-table .ant-collapse,
.props-table .ant-collapse-item {
  border-radius: 0px !important;
}

.props-table {
  width: 300px;
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  text-align: left;
  .prop-item {
    width: 100%;
    margin-bottom: 12px;
    text-align: left;
    .label {
      width: 28%;
      
    }
    .prop-component {
      width: 70%;
    }
  }
}
</style>