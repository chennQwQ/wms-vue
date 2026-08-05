import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '编号',
    align:"center",
    dataIndex: 'materialCode'
   },
   {
    title: '包材类型',
    align:"center",
    dataIndex: 'materialType'
   },
   {
    title: '包材名称',
    align:"center",
    dataIndex: 'materialName'
   },
   {
    title: '货主id',
    align:"center",
    dataIndex: 'ownerId'
   },
   {
    title: '长',
    align:"center",
    dataIndex: 'length'
   },
   {
    title: '宽',
    align:"center",
    dataIndex: 'width'
   },
   {
    title: '高',
    align:"center",
    dataIndex: 'height'
   },
   {
    title: '体积',
    align:"center",
    dataIndex: 'volume'
   },
   {
    title: '重量',
    align:"center",
    dataIndex: 'weight'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status',
     customRender: ({text}) => {
       return render.renderDict(text, 'dict_item_status');
     }
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'materialCode',
    component: 'Input',
  },
  {
    label: '包材类型',
    field: 'materialType',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:"material_type"
    },
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请选择包材类型!'},
      ];
    },
  },
  {
    label: '包材名称',
    field: 'materialName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入包材名称!'},
      ];
    },
  },
  // {
  //   label: '货主id',
  //   field: 'ownerId',
  //   component: 'Input',
  // },
  {
    label: '货主',
    field: 'ownerId',
    component: 'JSearchSelect',
    // dynamicRules: ({model,schema}) => {
    //   return [
    //     { required: true, message: '请输入货主!'},
    //   ];
    // },
    componentProps: {
      dict: "wms_cargo_owners,owner_name,id",
      //是否为搜索模式
      showSearch: true,
      //是否禁用
      disabled: false,
      onChange: (e: any) => {
      },
    },
  },
  {
    label: '长',
    field: 'length',
    component: 'InputNumber',
  },
  {
    label: '宽',
    field: 'width',
    component: 'InputNumber',
  },
  {
    label: '高',
    field: 'height',
    component: 'InputNumber',
  },
  {
    label: '体积',
    field: 'volume',
    component: 'InputNumber',
  },
  {
    label: '重量',
    field: 'weight',
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'dict_item_status',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入状态: 0-禁用, 1-启用!' }];
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
  materialCode: {title: '编号',order: 0,view: 'text', type: 'string',},
  materialType: {title: '包材类型',order: 1,view: 'text', type: 'string',},
  materialName: {title: '包材名称',order: 2,view: 'text', type: 'string',},
  ownerId: {title: '货主id',order: 3,view: 'text', type: 'string',},
  length: {title: '长',order: 4,view: 'number', type: 'number',},
  width: {title: '宽',order: 5,view: 'number', type: 'number',},
  height: {title: '高',order: 6,view: 'number', type: 'number',},
  volume: {title: '体积',order: 7,view: 'number', type: 'number',},
  weight: {title: '重量',order: 8,view: 'number', type: 'number',},
  status: {title: '状态',order: 9,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
