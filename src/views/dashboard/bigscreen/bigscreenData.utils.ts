export function normalizeBigscreenList<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === 'object' && Array.isArray((value as { records?: T[] }).records)) {
    return (value as { records: T[] }).records;
  }
  return [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object';
}

function everyRecordHas(value: unknown, fields: string[]): boolean {
  return Array.isArray(value) && value.length > 0 && value.every((item) => isRecord(item) && fields.every((field) => field in item));
}

export function isTodoCardData(value: unknown): boolean {
  return everyRecordHas(value, ['title', 'icon', 'value', 'total']);
}

export function isTrendData(value: unknown): boolean {
  return everyRecordHas(value, ['name', 'value']);
}

export function isRankListData(value: unknown): boolean {
  return everyRecordHas(value, ['name', 'total']);
}

export interface MonthlyTrendRecord {
  month: string;
  count: number | null;
}

export interface OwnerRankingRecord {
  ownerName: string;
  quantity: number | null;
}

export function mapMonthlyTrend(value: unknown): Array<{ name: string; value: number }> {
  return normalizeBigscreenList<MonthlyTrendRecord>(value)
    .filter((item) => typeof item?.month === 'string' && item.month.length > 0 && (typeof item.count === 'number' || item.count === null))
    .map((item) => ({ name: item.month, value: Number(item.count ?? 0) }));
}

export function mapOwnerRanking(value: unknown): Array<{ name: string; total: number }> {
  return normalizeBigscreenList<OwnerRankingRecord>(value)
    .filter(
      (item) =>
        typeof item?.ownerName === 'string' && item.ownerName.length > 0 && (typeof item.quantity === 'number' || item.quantity === null),
    )
    .map((item) => ({ name: item.ownerName, total: Number(item.quantity ?? 0) }));
}
