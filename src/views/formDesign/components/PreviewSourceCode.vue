<template>
  <div>
    <pre>{{ components }}</pre>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useEditorStore from '@/store/modules/editor'

const { components } = storeToRefs(useEditorStore())
</script>