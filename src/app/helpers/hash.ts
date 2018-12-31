import { HttpParams } from '@angular/common/http';

export function hashRequest(url: string, params?: HttpParams): string {
  let paramsHash = '';
  if (params) {
    paramsHash = btoa(
      params
        .keys()
        .sort()
        .map(key => key + params.get(key))
        .join('')
    );
  }

  const urlHash = btoa(url);
  return urlHash + paramsHash;
}
