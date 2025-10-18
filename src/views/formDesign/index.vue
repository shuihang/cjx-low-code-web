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
            <ComponentsList />
          </el-tab-pane>
          <el-tab-pane label="数据项" name="second">待开发</el-tab-pane>
          <el-tab-pane label="字段库" name="third">待开发</el-tab-pane>
        </el-tabs>
      </el-aside>

      <el-main>
        
        <div class="h-100% w-100%" id="editorContainer">
          <div>表单设计区域</div>
          <div id="canvas-area" class="bg-white w-100% h-[calc(100%-20px)] box-border p-t-20px p-b-20px">
            <VueDraggable v-model="formOption.column" target=".cjx-Form-row" item-key="prop" :animation="150">
              <x-form :form="form" :option="formOption" ></x-form>
            </VueDraggable>
          </div>
        </div>
      </el-main>

      <el-aside width="300px" :style="{...siderStyle, padding: '20px'}">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="控件属性" name="control">控件属性</el-tab-pane>
          <el-tab-pane label="表单属性" name="second">待开发</el-tab-pane>
          <el-tab-pane label="表单主题" name="third">待开发</el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { CSSProperties } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import type { FormOption } from 'cjx-low-code'
import ComponentsList from '@/components/common/ComponentsList.vue'

const siderStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: '100%',
  color: '#fff',
  backgroundColor: '#fff',
};

const activeName = ref('control')

const formOption = ref<FormOption>({
  menuBtn: false,
  formSpan: 12,
  column: [
    {
      label: '姓名',
      prop: 'name',
    },
    {
      label: '年龄',
      prop: 'age',
    },
  ]
})

const form = ref({})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.form-design-container {
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
}
</style>