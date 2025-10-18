<template>
  <div class="create-component-list">
    <div class="flex flex-wrap items-center justify-between">
      <div v-for="(item, index) in defaultTextTemplates"
      :key="index" class="create-component-list-item w-[calc(100%/2-20px)]"
      @click="addClick(item)"
      @mouseenter.stop="mouseEnter({row: item, elementId: `component-list-item_${index}`})"
      >
        <el-button class="w-100%" draggable="true" :id="`component-list-item_${index}`" :contenteditable="false" >
          <template #icon>
            <RenderVNode :v-node="item.icon()" />
          </template>
          {{ item.name }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import getDefaultFormTemplates from '@/defaultFormTemplates'
import type { FormComponentProps } from '@/defaultFormTemplates'
import RenderVNode from './RenderVNode';
import useTheme from '@/store/modules/theme'

const { themeColor } = storeToRefs(useTheme())

const defaultTextTemplates = ref<FormComponentProps[]>(getDefaultFormTemplates(themeColor.value))

watch(() => themeColor.value, (newVal) => {
  defaultTextTemplates.value = getDefaultFormTemplates(newVal)
})

const emit = defineEmits(['addItem'])

const addClick = (row: FormComponentProps) => {
  emit('addItem', row)
}

// 鼠标拖拽结束
const mouseEnter = (data: {row: FormComponentProps, elementId: string}) => {
  const { row, elementId } = data
  const element = document.getElementById(elementId) as HTMLDListElement
  // console.log(111, element.clientHeight)
  mouseStartDrop(row)
}

// 鼠标拖拽 给画布添加元素
const mouseStartDrop = (enterComponent: FormComponentProps) => {
  const editorContainer = document.getElementById('editorContainer') as HTMLDivElement
  const canvasArea = document.getElementById('canvas-area') as HTMLDivElement

  let width: number, height: number
  editorContainer.ondragstart = (e) => {
    const ele = e.target as HTMLElement
    width = ele.clientWidth
    height = ele.clientHeight
    console.log('start', ele.clientWidth)
  }

  editorContainer.ondragover = (e) => {
    e.preventDefault()
    // console.log('over', e.target)
  }

  editorContainer.ondrop = (e) => {
    // const ele = e.target as HTMLElement
    const { left, top } = canvasArea.getBoundingClientRect()
    const leftL = e.clientX - left - width / 2 + 'px'
    const topL = e.clientY - top- height / 2 + 'px'
    
    emit('addItem', {
      ...enterComponent
    })
  }
}

// defineExpose({
//   defaultTextTemplates
// })
</script>

<style lang="scss" scoped>

.create-component-list {
  
  &-item {
    cursor: pointer;
    // width: 100%;
    margin-bottom: 12px;
    position: relative;
    height: auto;
  }
}
</style>