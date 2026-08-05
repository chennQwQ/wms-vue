import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '承运商编码',
    align:"center",
    dataIndex: 'carrierCode'
   },
   {
    title: '承运商名称',
    align:"center",
    dataIndex: 'carrierName'
   },
   {
    title: '类型',
    align:"center",
    dataIndex: 'carrierType'
   },
   {
    title: '联系人',
    align:"center",
    dataIndex: 'contactPerson'
   },
   {
    title: '联系电话',
    align:"center",
    dataIndex: 'contactPhone'
   },
   {
    title: '邮箱',
    align:"center",
    dataIndex: 'contactEmail'
   },
   {
    title: '地址',
    align:"center",
    dataIndex: 'address'
   },
   {
    title: '国家',
    align:"center",
    dataIndex: 'country'
   },
   {
    title: '省',
    align:"center",
    dataIndex: 'province'
   },
   {
    title: '市',
    align:"center",
    dataIndex: 'city'
   },
   {
    title: '邮政编码',
    align:"center",
    dataIndex: 'postalCode'
   },
   {
    title: '税号',
    align:"center",
    dataIndex: 'taxId'
   },
   {
    title: '银行账号',
    align:"center",
    dataIndex: 'bankAccount'
   },
   {
    title: '开户行',
    align:"center",
    dataIndex: 'bankName'
   },
   {
    title: '账户持有人',
    align:"center",
    dataIndex: 'accountHolder'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '承运商编码',
    field: 'carrierCode',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入承运商编码!'},
          ];
     },
  },
  {
    label: '承运商名称',
    field: 'carrierName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入承运商名称!'},
          ];
     },
  },
  {
    label: '类型',
    field: 'carrierType',
    component: 'Input',
  },
  {
    label: '联系人',
    field: 'contactPerson',
    component: 'Input',
  },
  {
    label: '联系电话',
    field: 'contactPhone',
    component: 'Input',
  },
  {
    label: '邮箱',
    field: 'contactEmail',
    component: 'Input',
  },
  {
    label: '地址',
    field: 'address',
    component: 'Input',
  },
  {
    label: '国家',
    field: 'country',
    component: 'Input',
  },
  {
    label: '省',
    field: 'province',
    component: 'Input',
  },
  {
    label: '市',
    field: 'city',
    component: 'Input',
  },
  {
    label: '邮政编码',
    field: 'postalCode',
    component: 'Input',
  },
  {
    label: '税号',
    field: 'taxId',
    component: 'Input',
  },
  {
    label: '银行账号',
    field: 'bankAccount',
    component: 'Input',
  },
  {
    label: '开户行',
    field: 'bankName',
    component: 'Input',
  },
  {
    label: '账户持有人',
    field: 'accountHolder',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Input',
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
  carrierCode: {title: '承运商编码',order: 0,view: 'text', type: 'string',},
  carrierName: {title: '承运商名称',order: 1,view: 'text', type: 'string',},
  carrierType: {title: '类型',order: 2,view: 'text', type: 'string',},
  contactPerson: {title: '联系人',order: 3,view: 'text', type: 'string',},
  contactPhone: {title: '联系电话',order: 4,view: 'text', type: 'string',},
  contactEmail: {title: '邮箱',order: 5,view: 'text', type: 'string',},
  address: {title: '地址',order: 6,view: 'text', type: 'string',},
  country: {title: '国家',order: 7,view: 'text', type: 'string',},
  province: {title: '省',order: 8,view: 'text', type: 'string',},
  city: {title: '市',order: 9,view: 'text', type: 'string',},
  postalCode: {title: '邮政编码',order: 10,view: 'text', type: 'string',},
  taxId: {title: '税号',order: 11,view: 'text', type: 'string',},
  bankAccount: {title: '银行账号',order: 12,view: 'text', type: 'string',},
  bankName: {title: '开户行',order: 13,view: 'text', type: 'string',},
  accountHolder: {title: '账户持有人',order: 14,view: 'text', type: 'string',},
  status: {title: '状态',order: 15,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}