const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();
const mockConfirm = jest.fn();

jest.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete,
  },
}));

jest.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    createConfirm: mockConfirm,
  }),
}));

import {
  batchDeleteWmsProductCategories,
  deleteWmsProductCategories,
  getChildList,
  list,
  loadTreeChildren,
  loadTreeData,
  saveOrUpdateDict,
} from '../../../src/views/goods/WmsProductCategories.api';

describe('WmsProductCategories API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGet.mockResolvedValue([]);
    mockPost.mockResolvedValue({});
    mockPut.mockResolvedValue({});
    mockDelete.mockResolvedValue({});
  });

  test('uses jeecg-boot product categories tree endpoints', async () => {
    await list({ pageNo: 1, pageSize: 10, hasQuery: true });
    await getChildList({ parentId: '100' });
    await loadTreeChildren({ pid: '100' });
    await loadTreeData({ async: false, pcode: '' });

    expect(mockGet).toHaveBeenNthCalledWith(1, {
      url: '/goods/wmsProductCategories/rootList',
      params: { pageNo: 1, pageSize: 10, hasQuery: true },
    });
    expect(mockGet).toHaveBeenNthCalledWith(2, {
      url: '/goods/wmsProductCategories/childList',
      params: { parentId: '100' },
    });
    expect(mockGet).toHaveBeenNthCalledWith(3, {
      url: '/goods/wmsProductCategories/loadTreeChildren',
      params: { pid: '100' },
    });
    expect(mockGet).toHaveBeenNthCalledWith(4, {
      url: '/goods/wmsProductCategories/loadTreeRoot',
      params: { async: false, pcode: '' },
    });
  });

  test('submits add as JSON and edit with PUT JSON body', async () => {
    const addValues = { categoryName: '家居', categoryCode: '06', parentId: '0', status: '1' };
    const editValues = { id: '100', categoryName: '床上用品', categoryCode: '0601', parentId: '10', status: '1' };

    await saveOrUpdateDict(addValues, false);
    await saveOrUpdateDict(editValues, true);

    expect(mockPost).toHaveBeenCalledWith({
      url: '/goods/wmsProductCategories/add',
      data: addValues,
    });
    expect(mockPut).toHaveBeenCalledWith({
      url: '/goods/wmsProductCategories/edit',
      data: editValues,
    });
  });

  test('deletes one id and batch deletes comma joined ids on dedicated endpoints', async () => {
    const handleSuccess = jest.fn();

    await deleteWmsProductCategories({ id: '100' }, handleSuccess);
    batchDeleteWmsProductCategories({ ids: ['100', '101'] }, handleSuccess);
    await mockConfirm.mock.calls[0][0].onOk();

    expect(mockDelete).toHaveBeenNthCalledWith(1, { url: '/goods/wmsProductCategories/delete', params: { id: '100' } }, { joinParamsToUrl: true });
    expect(mockDelete).toHaveBeenNthCalledWith(
      2,
      { url: '/goods/wmsProductCategories/deleteBatch', params: { ids: '100,101' } },
      { joinParamsToUrl: true }
    );
    expect(handleSuccess).toHaveBeenCalledTimes(2);
  });
});
