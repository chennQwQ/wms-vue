<template>
  <Designer :template="template" @onDesigned="onDesigned" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Designer } from '@sv-print/vue3';
// 引入组件样式
import 'sv-print/dist/style.css';
let template = ref({});
const onDesigned = (e) => {
  console.log('onDesigned');
  console.log(e);
  const { hiprint, designerUtils } = e.detail;
  console.log(hiprint);
  console.log(designerUtils);
  console.log(designerUtils.printTemplate);
};
</script>
