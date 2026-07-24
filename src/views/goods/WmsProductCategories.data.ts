import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '类别名称',
    align: 'left',
    dataIndex: 'categoryName',
  },
  {
    title: '父节点',
    align: 'center',
    dataIndex: 'parentId',
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    customRender: ({ text, record }) => {
      return record.status_dictText || (text === '1' ? '启用' : text === '0' ? '禁用' : render.renderDict(text, 'dict_item_status'));
    },
  },
  {
    title: '节点编码',
    align: 'center',
    dataIndex: 'categoryCode',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '类别名称',
    field: 'categoryName',
    component: 'Input',
    dynamicRules: () => {
      return [{ required: true, message: '请输入类别名称!' }];
    },
  },
  {
    label: '父节点',
    field: 'parentId',
    defaultValue: '0',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        value: 'key',
      },
      dropdownStyle: {
        maxHeight: '50vh',
      },
      getPopupContainer: () => document.body,
    },
    dynamicRules: () => {
      return [{ required: true, message: '请输入父节点!' }];
    },
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: '1',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'dict_item_status',
    },
    dynamicRules: () => {
      return [{ required: true, message: '请选择状态!' }];
    },
  },
  {
    label: '节点编码',
    field: 'categoryCode',
    component: 'Input',
    dynamicRules: () => {
      return [{ required: true, message: '请输入节点编码!' }];
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

// 高级查询数据
export const superQuerySchema = {
  categoryName: { title: '类别名称', order: 0, view: 'text', type: 'string' },
  parentId: { title: '父节点', order: 1, view: 'text', type: 'string' },
  status: { title: '状态', order: 2, view: 'list', type: 'string', dictCode: 'dict_item_status' },
  categoryCode: { title: '节点编码', order: 3, view: 'text', type: 'string' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
