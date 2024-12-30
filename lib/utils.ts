import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_MANDALART_MAP = () => {
  const map = new Map<string, { core: string; values: string[] }>();
  for (let i = 1; i <= 8; i++) {
    map.set(`${i}`, { core: `C${i}`, values: Array(8).fill('') });
  }
  map.set('core', {
    core: 'Core',
    values: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
  });
  return map;
};

export const gridToMap = (grid: string[][]) => {
  const map = new Map<string, { core: string; values: string[] }>();
  grid.forEach((row, rowIndex) => {
    if (rowIndex === 4) {
      map.set('core', {
        core: row[4],
        values: row.slice(0, 4).concat(row.slice(5)),
      });
      return;
    }
    const key = rowIndex < 4 ? `${rowIndex + 1}` : `${rowIndex}`;
    map.set(key, {
      core: row[4],
      values: row.slice(0, 4).concat(row.slice(5)),
    });
  });
  return map;
};

export const mapToGrid = (
  map: Map<string, { core: string; values: string[] }>,
) => {
  // convert map to grid
  const result = Array(9)
    .fill(0)
    .map(() => Array(9).fill(''));
  map.forEach(({ core, values }, key) => {
    let rowIndex = key === 'core' ? 4 : parseInt(key);
    if (key !== 'core' && rowIndex <= 4) {
      rowIndex -= 1;
    }
    result[rowIndex] = [
      values[0],
      values[1],
      values[2],
      values[3],
      core,
      values[4],
      values[5],
      values[6],
      values[7],
    ];
  });
  return result;
};

export const mapToJson = (
  map: Map<string, { core: string; values: string[] }>,
) => {
  // convert map to json directly
  return JSON.stringify(Object.fromEntries(map), null, 2);
};
