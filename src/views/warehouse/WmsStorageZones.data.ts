import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
import { ref } from 'vue';
import { list as warehouseList } from './WmsWarehouses.api';

const warehouseNameMap = ref<Record<string, string>>({});

export async function loadWarehouseOptions() {
  try {
    const res = await warehouseList({ pageNo: 1, pageSize: 999 });
    const records = res?.records || [];
    warehouseNameMap.value = records.reduce((map, item) => {
      map[item.id] = item.warehouseName;
      return map;
    }, {});
  } catch (error) {
    warehouseNameMap.value = {};
  }
}
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '库区编码',
    align:"center",
    dataIndex: 'zoneCode'
   },
   {
    title: '库区名称',
    align:"center",
    dataIndex: 'zoneName'
   },
   {
    title: '库区类型',
    align:"center",
    dataIndex: 'zoneType_dictText'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status',
    customRender: ({ text, record }) => {
      return record.status_dictText || render.renderDict(text, 'wms_status');
    },
   },
   {
    title: '是否可售库存',
    align:"center",
    dataIndex: 'isSellable_dictText'
   },
   {
    title: '所属仓库',
    align:"center",
    dataIndex: 'warehouseName',
    customRender: ({ text, record }) => {
      return text || warehouseNameMap.value[record.warehouseId] || record.warehouseId;
    },
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '所属仓库',
    field: 'warehouseId',
    component: 'ApiSelect',
    componentProps: {
      api: warehouseList,
      resultField: 'records',
      labelField: 'warehouseName',
      valueField: 'id',
      showSearch: true,
      optionFilterProp: 'label',
    },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '库区编码',
    field: 'zoneCode',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入库区编码!'},
          ];
     },
  },
  {
    label: '库区名称',
    field: 'zoneName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入库区名称!'},
          ];
     },
  },
  {
    label: '库区类型',
    field: 'zoneType',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:"zone_type"
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入库区类型!'},
          ];
     },
  },
  {
    label: '状态: 创建,禁用, 启用',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"wms_status"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入状态: 创建,禁用, 启用!'},
          ];
     },
  },
  {
    label: '是否可售库存 0-否, 1-是',
    field: 'isSellable',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否可售库存 0-否, 1-是!'},
          ];
     },
  },
  {
    label: '所属仓库',
    field: 'warehouseId',
    component: 'ApiSelect',
    componentProps: {
      api: warehouseList,
      resultField: 'records',
      labelField: 'warehouseName',
      valueField: 'id',
      showSearch: true,
      optionFilterProp: 'label',
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择所属仓库!'},
          ];
     },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];

// 高级查询数据
export const superQuerySchema = {
  zoneCode: {title: '库区编码',order: 0,view: 'text', type: 'string',},
  zoneName: {title: '库区名称',order: 1,view: 'text', type: 'string',},
  zoneType: {title: '库区类型',order: 2,view: 'list', type: 'string',dictCode: 'zone_type',},
  status: {title: '状态: 创建,禁用, 启用',order: 3,view: 'list', type: 'string',dictCode: 'wms_status',},
  isSellable: {title: '是否可售库存 0-否, 1-是',order: 4,view: 'list', type: 'string',dictCode: 'yn',},
  warehouseId: {title: '所属仓库',order: 5,view: 'link_table', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
