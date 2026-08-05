import {
  isRankListData,
  isTodoCardData,
  isTrendData,
  mapOwnerRanking,
  mapMonthlyTrend,
  normalizeBigscreenList,
} from '../../../src/views/dashboard/bigscreen/bigscreenData.utils';

describe('bigscreen data helpers', () => {
  it('normalizes empty, paged and direct list responses', () => {
    expect(normalizeBigscreenList(undefined)).toEqual([]);
    expect(normalizeBigscreenList({ records: [{ id: 1 }] })).toEqual([{ id: 1 }]);
    expect(normalizeBigscreenList([{ id: 2 }])).toEqual([{ id: 2 }]);
  });

  it('does not treat todo cards as trend or rank data', () => {
    const todo = [{ title: '待收货任务', icon: 'clock', value: 3, total: 1 }];

    expect(isTodoCardData(todo)).toBe(true);
    expect(isTrendData(todo)).toBe(false);
    expect(isRankListData(todo)).toBe(false);
  });

  it('recognizes chart and ranking response shapes', () => {
    expect(isTrendData([{ name: '1月', value: 12 }])).toBe(true);
    expect(isRankListData([{ name: '货主A', total: 8 }])).toBe(true);
  });

  it('maps backend monthly trend records to chart data', () => {
    expect(mapMonthlyTrend([{ month: '1月', count: 12 }, { month: '2月', count: null }])).toEqual([
      { name: '1月', value: 12 },
      { name: '2月', value: 0 },
    ]);
  });

  it('maps backend owner ranking records to rank list data', () => {
    expect(mapOwnerRanking([{ ownerName: '货主A', quantity: 8.5 }])).toEqual([{ name: '货主A', total: 8.5 }]);
  });

  it('drops malformed backend analytics records', () => {
    expect(mapMonthlyTrend([{ title: '待收货', value: 3 }])).toEqual([]);
    expect(mapOwnerRanking([{ ownerName: '', quantity: 10 }])).toEqual([]);
  });
});
