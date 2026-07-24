import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '商品id',
    align:"center",
    dataIndex: 'productId'
   },
   {
    title: '原始图片地址',
    align:"center",
    dataIndex: 'original'
   },
   {
    title: '是否默认图片',
    align:"center",
    dataIndex: 'isDefault'
   },
   {
    title: '小图路径',
    align:"center",
    dataIndex: 'small'
   },
   {
    title: '缩略图路径',
    align:"center",
    dataIndex: 'thumbnail'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '商品id',
    field: 'productId',
    component: 'Input',
  },
  {
    label: '原始图片地址',
    field: 'original',
    component: 'Input',
  },
  {
    label: '是否默认图片',
    field: 'isDefault',
    component: 'Input',
  },
  {
    label: '小图路径',
    field: 'small',
    component: 'Input',
  },
  {
    label: '缩略图路径',
    field: 'thumbnail',
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
  productId: {title: '商品id',order: 0,view: 'text', type: 'string',},
  original: {title: '原始图片地址',order: 1,view: 'text', type: 'string',},
  isDefault: {title: '是否默认图片',order: 2,view: 'text', type: 'string',},
  small: {title: '小图路径',order: 3,view: 'text', type: 'string',},
  thumbnail: {title: '缩略图路径',order: 4,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}