// 朝代注册表 - 所有已添加的朝代在此注册
import type { DynastyInfo } from '../types/dynasty';

import { xiaDynasty } from './xia';
import { shangDynasty } from './shang';
import { zhouDynasty } from './zhou';
// 后续新朝代在此 import，例如:
// import { qinDynasty } from './qin';

export const dynasties: Record<string, DynastyInfo> = {
  [xiaDynasty.id]: xiaDynasty,
  [shangDynasty.id]: shangDynasty,
  [zhouDynasty.id]: zhouDynasty,
};

// 朝代列表（按时间顺序排列，从远古到近代）
export const dynastyList: DynastyInfo[] = [
  xiaDynasty,
  shangDynasty,
  zhouDynasty,
];

export function getDynasty(id: string): DynastyInfo | undefined {
  return dynasties[id];
}

export function getAllDynastyIds(): string[] {
  return dynastyList.map((d) => d.id);
}
