import { mapZoneOptions, readRecords } from '../../../src/views/warehouse/storageLocationOptions.utils';

describe('storage location option helpers', () => {
  it('accepts both paged and direct API responses', () => {
    expect(readRecords({ records: [{ id: '1' }] })).toEqual([{ id: '1' }]);
    expect(readRecords([{ id: '2' }])).toEqual([{ id: '2' }]);
  });

  it('maps zones to select options', () => {
    expect(mapZoneOptions({ records: [{ id: 'z1', zoneName: '拣选区' }] })).toEqual([{ value: 'z1', label: '拣选区' }]);
  });
});
