<template>
  <div class="form-design-container">
    <el-container class="h-100%">
      <el-aside width="300px" :style="{...siderStyle, padding: '20px'}">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="控件" name="control">
            <ComponentsList @addItem="addItem" />
          </el-tab-pane>
          <el-tab-pane label="数据项" name="second">待开发</el-tab-pane>
          <el-tab-pane label="字段库" name="third">待开发</el-tab-pane>
        </el-tabs>
      </el-aside>

      <el-main>
        
        <div class="h-100% w-100%" id="editorContainer">
          <PreviewMenu />
          
          <el-row id="canvas-area" class="bg-white w-100% h-[calc(100%-20px)] box-border p-20px">
            
            <DropZone />
            
          </el-row>
         
        </div>
      </el-main>

      <el-aside width="310px" :style="{...siderStyle, padding: '20px'}">
        <el-tabs
          v-model="activeKeyRight"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="控件属性" name="prop" v-if="currentElement">
            <PropsTable :data="getCurrentElement" @change="handleChange" />
          </el-tab-pane>
          <el-tab-pane label="表单属性" name="second">待开发</el-tab-pane>
          <el-tab-pane label="表单主题" name="third">待开发</el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import { storeToRefs } from 'pinia';
import type { TabsPaneContext } from 'element-plus'
import type { FormOption } from 'cjx-low-code'
import ComponentsList from '@/components/common/ComponentsList.vue'
import PreviewMenu from './components/PreviewMenu.vue';
import DropZone from './components/DropZone.vue'
import PropsTable from './components/PropsTable.vue'
import type { FormComponentProps } from '@/defaultFormTemplates'
import useEditorStore from '@/store/modules/editor'


// @ts-ignore
const { currentElement, getCurrentElement } = storeToRefs(useEditorStore())

const siderStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: '100%',
  color: '#fff',
  backgroundColor: '#fff',
};

const activeName = ref('control')
const activeKeyRight = ref('prop')



const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const addItem = (row: FormComponentProps) => {
  useEditorStore().addComponents(row)
}


const handleChange = ({ key, value }) =>{
  useEditorStore().updateComponents({key, value})
}
</script>

<style lang="scss" scoped>
.form-design-container {
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
}
</style>