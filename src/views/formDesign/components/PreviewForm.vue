<template>
  <XForm v-model:form="form" :option="formOptions"></XForm>
</template>

<script setup lang="ts">
import type { FormOption } from 'cjx-low-code'
import { storeToRefs } from 'pinia';
import useEditorStore from '@/store/modules/editor'

const { components } = storeToRefs(useEditorStore())

const form = ref({})
const formOptions = computed<FormOption>(() => ({
  menuBtn: false,
  column: components.value
}))
console.log(components.value)
</script>