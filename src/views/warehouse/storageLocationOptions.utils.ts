export function readRecords<T>(response: T[] | { records?: T[] } | undefined | null): T[] {
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response.records)) return response.records;
  return [];
}

export function mapZoneOptions(response: unknown): Array<{ label: string; value: string }> {
  return readRecords<any>(response as any).map((zone) => ({ label: zone.zoneName, value: zone.id }));
}
