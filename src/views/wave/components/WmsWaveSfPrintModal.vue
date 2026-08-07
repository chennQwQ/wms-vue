<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="打印电子面单" :minHeight="200" :showCancelBtn="false" :showOkBtn="false" :height="88" :destroyOnClose="true">
    <!--下拉框 选择了打印机后设置打印机，不设置打印机则使用默认打印机-->
    <a-select v-model:value="selectedPrinter" style="width: 320px;">
      <a-select-option value="" >请选择打印机</a-select-option>
      <a-select-option v-for="p in pcData" :key="p.id" :value="p.id">{{p.pcName}}</a-select-option>
    </a-select>
    <!--打印按钮-->
    <a-button type="primary" @click="print">打印</a-button>
  </BasicModal>
</template>
<script lang="ts" setup>
import {getCurrentInstance, reactive,  toRefs,ref} from "vue";
import { BasicModal, useModalInner } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import { ArrowRightOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'
import xss from 'xss'
// import { options } from './XssWhiteList'
const router = useRouter()
import inorderPanel from "/@/views/printTemplate/inorder-panel";
import {useMessage} from "@/hooks/web/useMessage";
interface DocumentItem {
  masterWaybillNo?: string;
  branchWaybillNo?: string;
  seq: number;
  sum: number;
  remark: string;
}
const printWaybillsParams = {token:"",documents: [] as DocumentItem[]}
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  // console.log('打印参数',data)
  printWaybillsParams.token=data.token;
  printWaybillsParams.documents = [];
  //打开弹窗时初始化打印机列表
  CreatePrinterList();
  //运单号数组
  let waybillNos = data.waybillNos;
  //将运单号数组构造成如下格式
  /**
   *  [{
   * 	"masterWaybillNo":"SF7444497619913",
   * 	"seq":"1",
   * 	"sum":"3",
   * 	"remark":"有需要可以传自己需要备注的简短内容，没有可以不传该字段"},
   *  {
   * 	"masterWaybillNo":"SF7444497619913",
   * 	"branchWaybillNo":"SF7444516115096",
   * 	"seq":"2",
   * 	"sum":"3",
   * 	"remark":"有需要可以传自己需要备注的简短内容，没有可以不传该字段"},
   *  {
   * 	"masterWaybillNo":"SF7444497619913",
   * 	"branchWaybillNo":"SF7444516115102",
   * 	"seq":"3",
   * 	"sum":"3",
   * 	"remark":"有需要可以传自己需要备注的简短内容，没有可以不传该字段"}
   */
  //遍历waybillNos数组
 let masterWaybillNo="";
  waybillNos.forEach((item, index) => {
    if(index==0){
      masterWaybillNo=item;
      printWaybillsParams.documents.push( {
        masterWaybillNo: item,
        seq: index + 1,
        sum: waybillNos.length,
        remark: ""
      })
    }else{
      printWaybillsParams.documents.push( {
        masterWaybillNo: masterWaybillNo,
        branchWaybillNo: item,
        seq: index + 1,
        sum: waybillNos.length,
        remark: ""
      })
    }
  })


  console.log('打印参数',printWaybillsParams.documents )

});
const { createMessage } = useMessage();
//打印机
const pcData = ref<Array<{id:number, pcName:string}>>([]);
const selectedPrinter = ref<string>("")
const hasHref = ref(false)

function CreatePrinterList(){
  //使用顺丰SDK自带的打印机列表接口，避免依赖外部Lodop脚本
  const sdk = getPrintSdk();
  let settled = false;
  const finish = () => { settled = true; };
  const timeout = window.setTimeout(() => {
    if(!settled){
      createMessage.warn('未检测到本机C-Lodop打印服务，请先安装并启动后再试');
    }
  }, 5000);
  sdk.getPrinters((result) => {
    window.clearTimeout(timeout);
    finish();
    if(!result || result.code !== 1 || !result.printers){
      if(result && result.msg){
        createMessage.warn(result.msg);
      }
      return;
    }
    const list: Array<{id:number, pcName:string}> = result.printers.map((p) => ({
      id: p.index,
      pcName: p.name
    }));
    pcData.value = list;
  });
}

let printSdk = null;
// 引入SDK后初始化实例，仅执行一次
function getPrintSdk(){
  if(printSdk) return printSdk;
  const sdkCallback = result => {};
  const sdkParams = {
    env: "sbox", // 生产：pro；沙箱：sbox。不传默认生产，转生产需要修改这里
    partnerID: "YYUIJVX3",
    callback: sdkCallback,
    notips: false
  };
  printSdk = new SCPPrint(sdkParams);
  return printSdk;
}
function generateSerial() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${random}`.toUpperCase();
}
// 打印
function print() {
  // console.log(printWaybillsParams.documents)
  if(selectedPrinter.value==""){
    createMessage.warn('请选择打印机')
    return;
  }
  const sdk = getPrintSdk();
  sdk.setPrinter(selectedPrinter.value);
  const data = {
    requestID: generateSerial(),
    accessToken: printWaybillsParams.token,
    templateCode: "fm_150_standard_YYUIJVX3",
    templateVersion: "",
    documents: printWaybillsParams.documents,
    // documents: [
    //   {
    //     "masterWaybillNo" : "SF7444497761557",
    //     "remark" : "",
    //     "seq" : 1,
    //     "sum" : 2
    //   },
    //   {
    //     "branchWaybillNo" : "SF7444516279186",
    //     "remark" : "",
    //     "seq" : 2,
    //     "sum" : 2
    //   },
    //
    // ],
    extJson: {},
    customTemplateCode: ""
  };
  const callback = function(result) {};
  const options = {
    lodopFn: "PRINT" // 默认打印，预览传PREVIEW
  };
  sdk.print(data, callback, options);
}

// 打印面单 printWaybills
</script>
<style id="style1">
@media print {
  table {
    border-collapse: collapse;
  }
  table, th, td {
    border: 1px solid black;
  }
}
</style>
<!--<style scoped lang="less">-->
<!--.detail-iframe {-->
<!--  border: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  min-height: 600px;-->
<!--}-->
<!--.hiprint-printElement-tableTarget-border-all{-->
<!--  border: 1px solid rgb(0, 0, 0);-->
<!--}-->
<!--</style>-->
