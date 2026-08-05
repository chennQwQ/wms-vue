export function selectPrintableRecords<T extends Record<string, any>>(rows: T[] | undefined, barcodeField: keyof T): T[] {
  if (!Array.isArray(rows)) {
    return [];
  }

  return rows.reduce<T[]>((records, row) => {
    const barcode = row?.[barcodeField];
    if (typeof barcode === 'string' && barcode.trim()) {
      records.push({ ...row, [barcodeField]: barcode.trim() });
    }
    return records;
  }, []);
}

export function assertPrintableSelection(rows: unknown[]): void {
  if (rows.length === 0) {
    throw new Error('请先选择需要打印的数据');
  }
}

export interface StorageLocationPrintRecord {
  locationCode: string;
  warehouseName: string;
  zoneName: string;
}

export function mapStorageLocationPrintRecord(record: Record<string, any>): StorageLocationPrintRecord {
  return {
    locationCode: String(record.locationCode ?? '').trim(),
    warehouseName: String(record.warehouseName ?? record.warehouse?.warehouseName ?? '').trim(),
    zoneName: String(record.zoneName ?? record.storageZones?.zoneName ?? '').trim(),
  };
}
