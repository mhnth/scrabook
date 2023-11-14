export * from './classix';

export function truncateStr(str: string, n = 365, disable = false) {
  if (!str) return 'str is null';
  if (str.length > n && disable != true) {
    return str.substring(0, n) + '...';
  }

  return str;
}
