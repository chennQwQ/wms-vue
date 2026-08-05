import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
import { useGlobSetting } from '/@/hooks/setting';
import { buildPreviewImageUrl } from './fileUrl.utils';

const glob = useGlobSetting();
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '品牌名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '品牌logo',
    align:"center",
    dataIndex: 'logo',
     customRender: ({ text }) => {
       if(!text){
         return text;
       }
       return render.renderImage({ text: buildPreviewImageUrl(text, glob.uploadUrl) });
     },
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status',
     customRender: ({text}) => {
       return render.renderDict(text, 'wms_status');
     }
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '品牌名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入品牌名称!'},
          ];
     },
  },
  {
    label: '品牌logo',
    field: 'logo',
    component: 'JImageUpload',
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:"wms_status",
    },
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入状态!'},
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
  name: {title: '品牌名称',order: 0,view: 'text', type: 'string',},
  logo: {title: '品牌logo',order: 1,view: 'text', type: 'string',},
  status: {title: '状态',order: 2,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
