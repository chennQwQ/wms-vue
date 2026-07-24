import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

const BASE_URL = '/goods/wmsProductCategories';

enum Api {
  list = '/rootList',
  save = '/add',
  edit = '/edit',
  deleteWmsProductCategories = '/delete',
  deleteBatch = '/deleteBatch',
  importExcel = '/importExcel',
  exportXls = '/exportXls',
  loadTreeRoot = '/loadTreeRoot',
  loadTreeChildren = '/loadTreeChildren',
  getChildList = '/childList',
}

const getUrl = (url: Api) => `${BASE_URL}${url}`;

/**
 * 导出api
 * @param params
 */
export const getExportUrl = getUrl(Api.exportXls);
/**
 * 导入api
 * @param params
 */
export const getImportUrl = getUrl(Api.importExcel);
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: getUrl(Api.list), params });
/**
 * 删除
 */
export const deleteWmsProductCategories = (params, handleSuccess) => {
  return defHttp.delete({ url: getUrl(Api.deleteWmsProductCategories), params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const batchDeleteWmsProductCategories = (params, handleSuccess) => {
  const ids = Array.isArray(params?.ids) ? params.ids.join(',') : params?.ids;
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: getUrl(Api.deleteBatch), params: { ids } }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdateDict = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  const data = {
    ...(isUpdate && { id: params.id }),
    categoryName: params.categoryName,
    categoryCode: params.categoryCode,
    parentId: params.parentId || '0',
    status: params.status || '1',
  };
  return isUpdate ? defHttp.put({ url: getUrl(url), data }) : defHttp.post({ url: getUrl(url), data });
};
/**
 * 加载树根节点
 * @param params
 */
export const loadTreeData = (params) => defHttp.get({ url: getUrl(Api.loadTreeRoot), params });
/**
 * 懒加载树子节点
 * @param params
 */
export const loadTreeChildren = (params) => defHttp.get({ url: getUrl(Api.loadTreeChildren), params });
/**
 * 查询子节点数据
 * @param params
 */
export const getChildList = (params) => defHttp.get({ url: getUrl(Api.getChildList), params });
