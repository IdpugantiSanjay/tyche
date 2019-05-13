import { ParamMap } from '@angular/router';

export class PramMapToObjConverter {
  static convert<T>(paramMap: ParamMap): T {
    var result: T = {} as T;
    for (let key of paramMap.keys) {
      result[key] = paramMap.get(key);
    }
    return result;
  }
}
