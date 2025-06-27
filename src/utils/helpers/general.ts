import type { DeepReadonly } from "./typescript";

export const clone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;

  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any;

  const copy: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const val = (obj as any)[key];
    if (typeof val === "function") {
      copy[key] = val.bind(copy);
    } else if (val && typeof val === "object") {
      copy[key] = clone(val);
    } else {
      copy[key] = val;
    }
  }

  return copy;
};

export const swapBy = <T>(
  data: DeepReadonly<T[]>,
  fromIndex: number,
  toIndex: number
): T[] => {
  const tempData = JSON.parse(JSON.stringify(data));
  const swap = tempData.splice(fromIndex, 1).pop();
  tempData.splice(toIndex, 0, swap);
  return tempData;
};

export const generateRandomNrBetween = (min = 0, max = 100) => {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
};

export function isEqual<T>(a: T, b: T): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a.constructor === Object &&
    b.constructor === Object
  ) {
    const keysA = Object.keys(a) as (keyof T)[];
    const keysB = Object.keys(b) as (keyof T)[];

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => isEqual(a[key], b[key]));
  }

  return false;
}

export function shallowEqual<T extends object>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key as keyof T] !== obj2[key as keyof T]) {
      return false;
    }
  }

  return true;
}
