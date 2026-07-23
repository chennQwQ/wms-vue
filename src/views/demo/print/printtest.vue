<template>
  <a-button type="primary" @click="printWeb">打印</a-button>
</template>

<script setup lang="ts">
import { getLodop } from '/@/assets/LodopFuncs' //导入模块
import { hiprint } from 'sv-print';
import inorderPanel from "@/views/printTemplate/inorder-panel";
import {ref} from "vue";


const printData=ref({});


printData.value = {
  "orderNumber": "ASN202505140002",
  "warehouseName": "中原一号仓库",
  "ownerName": "传智教育",
  "sourceNumber": "S00293932",
  "warehouseManager": "小王",
  "editor": "小李",
  "url": "http://www.itcast.cn",
  "table": [
    {
      "orderIndex": "1",
      "productCode": "1010201",
      "productName": "刹车片",
      "expectedQuantity": "101",
      "remarks": ""
    }
    ,
    {
      "orderIndex": "2",
      "productCode": "1010202",
      "productName": "刹车片2",
      "expectedQuantity": "33",
      "remarks": ""
    }

  ]
}
function printWeb() {
  // 创建模板对象
  const hiprintTemplate = new hiprint.PrintTemplate({
    template: inorderPanel, // 模板json对象
  });
  const jqueryObj = hiprintTemplate.getHtml(printData.value);
  const html = jqueryObj.html();
  console.log(html)
  // const template = hiprintTemplate.getJson();
  hiprintTemplate.print(printData.value, {}, {
    styleHandler: () => {
      return '<link href="http://xx/print-lock.css" media="print" rel="stylesheet">'
    }
  })
}
</script>
