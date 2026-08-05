import {
  assertPrintableSelection,
  mapStorageLocationPrintRecord,
  selectPrintableRecords,
} from '../../../src/views/printTemplate/barcodePrint.utils';

describe('barcode print helpers', () => {
  it('returns no printable records when selection is absent', () => {
    expect(selectPrintableRecords(undefined, 'productBarcode')).toEqual([]);
  });

  it('filters records without a barcode and trims barcode text', () => {
    expect(selectPrintableRecords([{ productBarcode: '' }, { productBarcode: ' P-001 ' }], 'productBarcode')).toEqual([
      { productBarcode: 'P-001' },
    ]);
  });

  it('rejects an empty printable selection', () => {
    expect(() => assertPrintableSelection([])).toThrow('请先选择需要打印的数据');
  });

  it('normalizes nested warehouse and zone names for a storage location label', () => {
    expect(
      mapStorageLocationPrintRecord({
        locationCode: 'L-01',
        warehouse: { warehouseName: '一号仓' },
        storageZones: { zoneName: '拣选区' },
      })
    ).toEqual({ locationCode: 'L-01', warehouseName: '一号仓', zoneName: '拣选区' });
  });
});
